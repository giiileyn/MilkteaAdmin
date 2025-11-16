import React from "react";

export default function Receipt({ order }) {
  return (
    <div style={{
      fontFamily: "'Courier New', Courier, monospace",
      padding: "20px",
      color: "#333",
      lineHeight: 1.4,
    }}>
      {/* Logo and Store Name */}
      <div style={{ textAlign: "center", marginBottom: "15px" }}>
        <h1 style={{ margin: 0, fontSize: "28px", color: "#B39172" }}>WowMilkteh</h1>
        <p style={{ margin: 0, fontSize: "14px", color: "#8C7B6A" }}>Thank you for your order!</p>
      </div>

      {/* Order Info */}
      <div style={{ marginBottom: "15px" }}>
        <strong>Receipt:</strong> ORD-{String(order.id).padStart(3, "0")} <br />
        <strong>Date:</strong> {order.date} <br />
        <strong>Status:</strong> {order.status}
      </div>

      <hr style={{ border: "1px dashed #C9B8A6", margin: "10px 0" }} />

      {/* Items */}
      <div>
        {order.items.map((item, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", margin: "6px 0" }}>
            <span>{item.qty}x {item.name}</span>
            <span>₱ {item.price.toLocaleString()}</span>
          </div>
        ))}
      </div>

      <hr style={{ border: "1px dashed #C9B8A6", margin: "10px 0" }} />

      {/* Total */}
      <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: "16px", marginBottom: "20px" }}>
        <span>Total:</span>
        <span>₱ {order.total.toLocaleString()}</span>
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", fontSize: "12px", color: "#8C7B6A" }}>
        <p>Visit us again at WowMilkteh!</p>
        <p>Enjoy your drink!</p>
      </div>
    </div>
  );
}
