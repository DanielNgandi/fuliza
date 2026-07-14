import React from "react";
import Layout from "../components/Layout";
import IncreaseLimit from "./Increaselimit";
import Support from "../components/support";

export default function Home() {
  return (
    <div>
      {/* PACKAGE SECTION */}
      <section style={{ marginBottom: "60px" }}>
        <IncreaseLimit />
      </section>

      {/* SUPPORT SECTION */}
      <section>
        <Support />
      </section>
    </div>
  );
}