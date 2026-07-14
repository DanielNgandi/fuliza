// src/components/Support.jsx
import React from "react";
import supportImage from "../assets/support.jpg"; 

export default function Support() {
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* IMAGE SECTION */}
        <div style={styles.imageContainer}>
          <img 
            src={supportImage} 
            alt="Customer Support" 
            style={styles.supportImage}
          />
        </div>

        <h1 style={styles.title}>🎧 Support Center</h1>
        <p style={styles.subtitle}>
          Need help? Contact our support team anytime.
        </p>

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>📧 Email Support</h3>
          <p style={styles.sectionContent}>support@fulizaboost.com</p>
        </div>

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>📞 Phone Support</h3>
          <p style={styles.sectionContent}>+254 700 000 000</p>
        </div>

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>⏰ Working Hours</h3>
          <p style={styles.sectionContent}>Monday - Friday : 8AM - 5PM</p>
        </div>

        {/* SAFARICOM STYLED BUTTON */}
        <button style={styles.button}>
          💬 Chat With Support
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fff8", // Matching the green theme
    padding: "20px",
  },

  card: {
    width: "100%",
    maxWidth: "550px",
    backgroundColor: "#fff",
    padding: "clamp(30px, 5vw, 50px)",
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    textAlign: "center",
  },

  imageContainer: {
    marginBottom: "20px",
    display: "flex",
    justifyContent: "center",
  },

  supportImage: {
    width: "clamp(120px, 30vw, 180px)",
    height: "auto",
    borderRadius: "50%",
    objectFit: "cover",
    border: "3px solid #00a651",
    padding: "5px",
  },

  title: {
    fontSize: "clamp(24px, 6vw, 32px)",
    marginBottom: "10px",
    color: "#333",
  },

  subtitle: {
    color: "#666",
    marginBottom: "30px",
    fontSize: "clamp(14px, 4vw, 16px)",
  },

  section: {
    marginBottom: "25px",
    padding: "10px",
    backgroundColor: "#f8f9fa",
    borderRadius: "10px",
    textAlign: "left",
  },

  sectionTitle: {
    marginBottom: "5px",
    color: "#00a651",
    fontSize: "clamp(14px, 4vw, 16px)",
  },

  sectionContent: {
    color: "#555",
    fontSize: "clamp(13px, 3.5vw, 15px)",
    margin: 0,
  },

  button: {
    width: "100%",
    padding: "14px 24px",
    border: "none",
    background: "linear-gradient(135deg, #00a651, #00c853)", // Safaricom green gradient
    color: "#fff",
    borderRadius: "50px", // Pill shape like M-Pesa
    cursor: "pointer",
    fontSize: "clamp(14px, 4vw, 16px)",
    fontWeight: "bold",
    marginTop: "10px",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 12px rgba(0,166,81,0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },
};

// Add hover effect with JavaScript
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0,166,81,0.4);
  }
  
  button:active {
    transform: translateY(0);
  }
`;
document.head.appendChild(styleSheet);