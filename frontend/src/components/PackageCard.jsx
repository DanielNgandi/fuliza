import React from "react";

const PackageCard = ({
  name,
  price,
  limit,     
  features = [],
  selected,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      style={{
        width: 280,
        background: "white",
        borderRadius: 15,
        padding: 25,
        cursor: "pointer",
        boxShadow: selected
          ? "0 10px 25px rgba(0,166,81,0.3)"
          : "0 5px 15px rgba(0,0,0,0.08)",
        border: selected
          ? "2px solid #00a651"
          : "1px solid #eee",
        transition: "0.3s",
        transform: selected
          ? "translateY(-5px)"
          : "translateY(0)",
      }}
    >
      <h2 style={{ marginBottom: 10 }}>{name}</h2>

      {/* 🔥 HIGHLIGHTED LIMIT SECTION - ADD THIS */}
      <div
        style={{
          background: "linear-gradient(135deg, #ff9800, #ff6d00)",
          borderRadius: 50,
          padding: "12px 10px",
          marginBottom: 15,
          textAlign: "center",
          boxShadow: "0 2px 8px rgba(255,109,0,0.3)",
        }}
      >
        <span style={{ fontSize: 24, fontWeight: "bold", color: "white", marginRight: 5 }}>
          ↑
        </span>
        <span
          style={{
            fontSize: 36,
            fontWeight: "bold",
            color: "white",
            textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
            marginRight: 8,
          }}
        >
          +{limit}
        </span>
        <span
          style={{
            fontSize: 14,
            fontWeight: "bold",
            color: "white",
            backgroundColor: "rgba(255,255,255,0.3)",
            padding: "2px 8px",
            borderRadius: 20,
          }}
        >
          LIMIT
        </span>
      </div>

      <h1
        style={{
          color: "#00a651",
          marginTop: 10,
          fontSize: 28,
          textAlign: "center",
        }}
      >
        KES {price?.toLocaleString()}
      </h1>

      <ul
        style={{
          marginTop: 20,
          marginBottom: 20,
          paddingLeft: 20,
        }}
      >
        {features.map((feature, index) => (
          <li
            key={index}
            style={{
              marginBottom: 10,
              color: "#555",
            }}
          >
            ✓ {feature}
          </li>
        ))}
      </ul>

      <button
        style={{
          width: "100%",
          padding: 12,
          borderRadius: 8,
          border: "none",
          background: selected ? "#cccccc" : "#00a651",
          color: "white",
          cursor: selected ? "not-allowed" : "pointer",
          fontWeight: "bold",
          fontSize: 16,
          transition: "0.2s",
        }}
        disabled={selected}
      >
        {selected ? "✓ Selected" : "Choose Package"}
      </button>
    </div>
  );
};

export default PackageCard;