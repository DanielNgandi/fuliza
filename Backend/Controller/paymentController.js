// Controllers/paymentController.js
import prisma from "../util/prismaClient.js";
import axios from "axios";
import moment from "moment";
import { getAccessToken } from "../util/mpesa.js";

export const stkPushPayment = async (req, res) => {
  try {
    const { phone, amount, packageName } = req.body;

    if (!phone || !amount || !packageName) {
      return res.status(400).json({
        error: "phone, amount, and packageName are required",
      });
    }

    const numericAmount = parseInt(amount);

    // Ensure correct format: 2547XXXXXXXX
    const formattedPhone = phone.startsWith("0")
      ? "254" + phone.substring(1)
      : phone;

    // Unique checkout ID
    const checkoutId =
      "MPESA_" +
      Date.now() +
      "_" +
      Math.random().toString(36).substring(2, 10);

    // Save payment first
    const payment = await prisma.payment.create({
      data: {
        phone: formattedPhone,
        amount: numericAmount,
        packageName,
        checkoutId,
        status: "PENDING",
      },
    });

    // Get access token
    const token = await getAccessToken();

    const timestamp = moment().format("YYYYMMDDHHmmss");

    const password = Buffer.from(
      process.env.SHORTCODE + process.env.PASSKEY + timestamp
    ).toString("base64");

    // STK PUSH REQUEST
    const response = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        BusinessShortCode: process.env.SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: numericAmount,
        PartyA: formattedPhone,
        PartyB: process.env.SHORTCODE,
        PhoneNumber: formattedPhone,
        CallBackURL: process.env.CALLBACK_URL,
        AccountReference: packageName,
        TransactionDesc: `Payment for ${packageName}`,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("STK RESPONSE:", response.data);

    // SUCCESS from Safaricom
    if (response.data.ResponseCode === "0") {
      await prisma.payment.update({
        where: { id: payment.id },
        data: {
          mpesaCheckoutId: response.data.CheckoutRequestID,
        },
      });

      return res.status(200).json({
        checkoutId: payment.checkoutId,
        responseCode: response.data.ResponseCode,
        message: "STK Push sent successfully",
      });
    }

    // FAILED
    return res.status(400).json({
      error: "STK Push failed",
      details: response.data,
    });
  } catch (error) {
    console.error("STK ERROR:", error.response?.data || error.message);

    return res.status(500).json({
      error: "Payment initiation failed",
      details: error.response?.data || error.message,
    });
  }
};

/**
 * =========================
 * CALLBACK (MOST IMPORTANT)
 * =========================
 */
export const mpesaCallback = async (req, res) => {
  try {
    console.log("CALLBACK RECEIVED:", JSON.stringify(req.body, null, 2));

    const stkCallback = req.body.Body?.stkCallback;

    if (!stkCallback) {
      return res.json({ ResultCode: 0, ResultDesc: "No callback data" });
    }

    const {
      CheckoutRequestID,
      ResultCode,
      ResultDesc,
    } = stkCallback;

    const payment = await prisma.payment.findFirst({
      where: { mpesaCheckoutId: CheckoutRequestID },
    });

    if (payment) {
      await prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: ResultCode === 0 ? "SUCCESS" : "FAILED",
          mpesaResultCode: ResultCode,
          mpesaResultDesc: ResultDesc,
        },
      });

      console.log(
        `PAYMENT ${ResultCode === 0 ? "SUCCESS" : "FAILED"}:`,
        payment.phone
      );
    }

    return res.json({ ResultCode: 0, ResultDesc: "Accepted" });
  } catch (error) {
    console.error("CALLBACK ERROR:", error);

    return res.json({ ResultCode: 0, ResultDesc: "Handled" });
  }
};

/**
 * =========================
 * GET PAYMENT STATUS
 * =========================
 */
export const getPaymentStatus = async (req, res) => {
  try {
    const { checkoutId } = req.params;

    const payment = await prisma.payment.findUnique({
      where: { checkoutId },
    });

    if (!payment) {
      return res.status(404).json({
        error: "Payment not found",
      });
    }

    return res.json({
      status: payment.status,
      resultCode: payment.mpesaResultCode,
      resultDesc: payment.mpesaResultDesc,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Failed to fetch payment status",
    });
  }
};