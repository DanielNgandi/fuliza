import axios from "axios";
import React, { useState } from "react";
import PackageCard from "../components/PackageCard";

const packages = [
  { id: 1, name: "Basic", price: 5, limit: 100, features: ["+100 limit", "24/7 support", "Instant activation"] },
  { id: 2, name: "Basic", price: 150, limit: 300, features: ["+300 limit", "24/7 support", "Instant activation"] },
  { id: 3, name: "Premium", price: 200, limit: 500, features: ["+500 limit", "Priority support", "Instant activation"] },
  { id: 4, name: "Premium", price: 350, limit: 800, features: ["+800 limit", "Priority support", "Instant activation"] },
  { id: 5, name: "Enterprise", price: 450, limit: 1000, features: ["+1000 limit", "VIP support", "Fast approval"] },
  { id: 6, name: "Enterprise", price: 650, limit: 1500, features: ["+1500 limit", "VIP support", "Fast approval"] },
  { id: 7, name: "Enterprise", price: 750, limit: 2000, features: ["+2000 limit", "Dedicated manager", "Instant approval"] },
  { id: 8, name: "Enterprise", price: 1000, limit: 3000, features: ["+3000 limit", "Dedicated manager", "24/7 priority"] },
  { id: 9, name: "Enterprise", price: 2000, limit: 5000, features: ["+5000 limit", "Custom features", "API access"] },
  { id: 10, name: "Enterprise", price: 4000, limit: 10000, features: ["+10000 limit", "Custom features", "White glove support"] },
  { id: 11, name: "Enterprise", price: 8000, limit: 20000, features: ["+20000 limit", "Custom contract", "24/7 hotline"] },
];

export default function IncreaseLimit() {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [pollingInterval, setPollingInterval] = useState(null);

  const handleSelectPackage = (pkg) => {
    setSelectedPackage(pkg);
    setShowModal(true);
    setMessage("");
    setPaymentSuccess(false);
    
    // Clear any existing polling
    if (pollingInterval) {
      clearInterval(pollingInterval);
      setPollingInterval(null);
    }
  };

  const handlePayment = async () => {
    if (!phone) {
      setMessage("Please enter your phone number");
      return;
    }

    // Validate phone number (accepts 2547XXXXXXXX or 07XXXXXXXX)
    const phoneRegex = /^(2547\d{8}|07\d{8})$/;
    if (!phoneRegex.test(phone)) {
      setMessage("Enter a valid Safaricom phone number (e.g., 2547XXXXXXXX or 07XXXXXXXX)");
      return;
    }

    // Format phone number to 254XXXXXXXXX format
    let formattedPhone = phone;
    if (formattedPhone.startsWith("0")) {
      formattedPhone = "254" + formattedPhone.substring(1);
    }

    try {
      setLoading(true);
      setMessage("");

      // Use real STK Push endpoint
      const res = await axios.post(
        "http://localhost:5000/api/payment/stkpush",
        {
          phone: formattedPhone,
          amount: selectedPackage.price,
          packageName: selectedPackage.name,
        }
      );

      if (res.data.responseCode === "0") {
        setMessage("📱 M-Pesa STK Push sent! Please check your phone and enter PIN.");
        
        // Start polling for payment status
        const interval = setInterval(async () => {
          try {
            const statusRes = await axios.get(
              `http://localhost:5000/api/payment/status/${res.data.checkoutId}`
            );
            
            if (statusRes.data.status === "SUCCESS") {
              clearInterval(interval);
              setPollingInterval(null);
              setLoading(false);
              setPaymentSuccess(true);
              setMessage("");
            } else if (statusRes.data.status === "FAILED") {
              clearInterval(interval);
              setPollingInterval(null);
              setLoading(false);
              setMessage(statusRes.data.resultDesc || "Payment failed. Please try again.");
            }
          } catch (error) {
            console.error("Status check error:", error);
          }
        }, 3000);
        
        setPollingInterval(interval);
      } else {
        setMessage("Failed to initiate payment. Please try again.");
        setLoading(false);
      }
    } catch (err) {
      console.error("Payment error:", err);
      setLoading(false);
      setMessage(err.response?.data?.details || "Payment failed. Please try again.");
    }
  };

  // Cleanup polling on component unmount
  React.useEffect(() => {
    return () => {
      if (pollingInterval) {
        clearInterval(pollingInterval);
      }
    };
  }, [pollingInterval]);

  return (
    <div style={styles.page}>
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>Increase Your Limit Instantly</h1>
        <p style={styles.heroText}>
          Powered by M-Pesa • Fast • Secure • Reliable
        </p>
      </section>

      <section style={styles.packages}>
        {packages.map((pkg) => (
          <PackageCard
            key={pkg.id}
            name={pkg.name}
            price={pkg.price}
            limit={pkg.limit}
            features={pkg.features}
            selected={selectedPackage?.id === pkg.id}
            onClick={() => handleSelectPackage(pkg)}
          />
        ))}
      </section>

      {showModal && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <button
              style={styles.closeBtn}
              onClick={() => {
                setShowModal(false);
                if (pollingInterval) {
                  clearInterval(pollingInterval);
                  setPollingInterval(null);
                }
              }}
            >
              ✕
            </button>

            {!paymentSuccess ? (
              <>
                <h2 style={styles.modalTitle}>{selectedPackage?.name} Package</h2>
                
                <div style={styles.limitContainer}>
                  <span style={styles.limitLabel}>📈 Limit Increase:</span>
                  <span style={styles.limitValue}>+{selectedPackage?.limit}</span>
                </div>

                <div style={styles.priceContainer}>
                  <span style={styles.priceLabel}>💰 Price:</span>
                  <span style={styles.priceValue}>KES {selectedPackage?.price?.toLocaleString()}</span>
                </div>

                <input
                  style={styles.input}
                  placeholder="Phone Number (e.g., 2547XXXXXXXX)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={loading}
                />

                <button style={styles.payBtn} onClick={handlePayment} disabled={loading}>
                  {loading ? "Processing..." : "Pay with M-Pesa"}
                </button>

                {message && typeof message === 'string' && (
  <p style={message.includes("check your phone") ? styles.infoMessage : styles.message}>
    {message}
  </p>
                )}
              </>
            ) : (
              <div style={styles.success}>
                <h2>🎉 Payment Successful!</h2>
                <p>Your account has been upgraded to +{selectedPackage?.limit} limit!</p>
                <button 
                  style={styles.closeSuccessBtn}
                  onClick={() => {
                    setShowModal(false);
                    setPaymentSuccess(false);
                  }}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "Arial",
    background: "#f5fff8",
    minHeight: "100vh",
  },
  hero: {
    textAlign: "center",
    padding: "60px 20px",
    background: "linear-gradient(135deg, #00a651, #00c853)",
    color: "white",
  },
  heroTitle: {
    fontSize: "40px",
    marginBottom: "10px",
  },
  heroText: {
    fontSize: "18px",
  },
  packages: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
    padding: "40px",
  },
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    background: "white",
    padding: "30px",
    borderRadius: "16px",
    width: "450px",
    maxWidth: "90%",
    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
  },
  closeBtn: {
    float: "right",
    border: "none",
    background: "transparent",
    fontSize: "24px",
    cursor: "pointer",
    color: "#666",
    marginTop: "-10px",
  },
  modalTitle: {
    fontSize: "28px",
    marginBottom: "20px",
    textAlign: "center",
    color: "#333",
  },
  limitContainer: {
    background: "linear-gradient(135deg, #fff3e0, #ffe0b2)",
    padding: "15px",
    borderRadius: "12px",
    marginBottom: "15px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "2px solid #ff9800",
  },
  limitLabel: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#e65100",
  },
  limitValue: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#ff6d00",
    textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
    letterSpacing: "1px",
  },
  priceContainer: {
    background: "#f0fdf4",
    padding: "15px",
    borderRadius: "12px",
    marginBottom: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "2px solid #00a651",
  },
  priceLabel: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#006633",
  },
  priceValue: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#00a651",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    border: "2px solid #ccc",
    borderRadius: "8px",
    fontSize: "16px",
  },
  payBtn: {
    width: "100%",
    marginTop: "15px",
    padding: "12px",
    background: "#00a651",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  },
  message: {
    marginTop: "10px",
    color: "red",
    textAlign: "center",
  },
  infoMessage: {
    marginTop: "10px",
    color: "#0066cc",
    textAlign: "center",
  },
  success: {
    textAlign: "center",
    padding: "20px",
  },
  closeSuccessBtn: {
    marginTop: "20px",
    padding: "10px 20px",
    background: "#00a651",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
  },
};