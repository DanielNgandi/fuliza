// Router/paymentRouter.js
import express from "express";
import { stkPushPayment,
  getPaymentStatus,
  mpesaCallback } from "../Controller/paymentController.js";

const router = express.Router();

//router.post("/local", localPayment);
router.post("/stkpush", stkPushPayment);
router.get("/status/:checkoutId", getPaymentStatus);
router.post("/callback", mpesaCallback);

export default router;