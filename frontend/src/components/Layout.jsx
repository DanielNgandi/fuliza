import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <>
      <Header />

      <main style={styles.main}>
        {children}
      </main>

      <Footer />
    </>
  );
}

const styles = {
  main: {
    minHeight: "80vh",
    width: "100%",
  },
};