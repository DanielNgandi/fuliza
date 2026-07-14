// src/components/Footer.jsx

import React from "react";

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <p>© 2026 Fuliza Boost. Powered by Safaricom-inspired UI 💚</p>
    </footer>
  );
}

const styles = {
  footer: {
    textAlign: "center",
    padding: "20px",
    marginTop: "40px",
    background: "#00a651",
    color: "white",
  },
};