import React, { useState } from "react";

export default function Order() {
  const [tab, setTab] = useState("All");

  // sample orders (id auto increments later)
  const orders = [
    {
      date: "Nov 14, 2025",
      items: [
        { name: "Fresh Apple of my eye", qty: 2, price: 500 },
        { name: "Fresh Banana ketchup", qty: 69, price: 500 },
      ],
      total: 1000,
      status: "Delivered",
    },
    {
      date: "Nov 14, 2025",
      items: [
        { name: "Fresh Apple of my eye", qty: 2, price: 500 },
        { name: "Fresh Banana ketchup", qty: 69, price: 500 },
      ],
      total: 1000,
      status: "Processing",
    },
  ];

  const filteredOrders =
    tab === "All" ? orders : orders.filter((o) => o.status === tab);

  return (
    <>
      <style>{`
        body {
          margin: 0;
          background: #F3E9DA !important;
        }

        .order-page-container {
          padding: 20px;
          background: #F3E9DA;
          min-height: 100vh;
          width: 100vw;
          overflow-x: hidden;
        }

        /* ==== TABS ==== */
        .order-tabs {
          display: flex;
          gap: 12px;
          margin-bottom: 20px;
          overflow-x: auto;
          padding-bottom: 10px;
          width: 100%;
        }

        .order-tab {
          padding: 10px 24px;
          border-radius: 25px;
          border: 1px solid #C9B8A6;
          background: #E6D6C4;
          cursor: pointer;
          font-size: 15px;
          font-weight: 500;
          color: #5A4632;
          white-space: nowrap;
          transition: 0.2s;
        }

        .order-tab.active {
          background: #B39172;
          color: white;
          border-color: #A07C5A;
        }

        /* ==== ORDER CARD ==== */
        .order-card {
          background: #FFF5E1;
          padding: 20px;
          border-radius: 18px;
          margin-bottom: 20px;
          width: calc(100% - 90px); /* more left padding */
          margin-left: 20px;
          box-shadow: 0 3px 8px #00000015;
          border: 1px solid #E2D4C4;
        }

        /* ==== HEADER ==== */
        .order-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-right: 20px; /* moved left */
        }

        .order-header h3 {
          margin: 0;
          color: #5A4632;
        }

        .order-date {
          color: #8C7B6A;
          font-size: 14px;
        }

        /* ==== STATUS BADGES ==== */
        .status-badge {
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 600;
          text-transform: capitalize;
          margin-right: 20px; /* move left from edge */
        }

        .status-badge.delivered {
          background: #DDEDD8;
          color: #4B7C47;
        }
        .status-badge.processing {
          background: #FCE7B6;
          color: #B27A1A;
        }
        .status-badge.shipped {
          background: #DFE9FF;
          color: #345B9C;
        }

        /* ==== ITEMS ==== */
        .order-items {
          margin: 15px 0;
        }

        .order-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 5px 10px; /* added left-right padding */
        }

        .order-item span {
          color: #5A4632;
          font-size: 15px;
        }

        .dot {
          width: 10px;
          height: 10px;
          background: #7F9D63;
          border-radius: 50%;
          margin-right: 10px;
        }

        .price {
          color: #8C7B6A;
          margin-right: 15px; /* moved left */
        }

        /* ==== FOOTER ==== */
        .order-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 10px; /* moved inwards */
        }

        .order-footer small {
          font-size: 13px;
          color: #8C7B6A;
        }

        .order-footer h3 {
          margin: 3px 0;
          color: #5A4632;
        }

        /* ==== DETAILS BUTTON ==== */
        .btn.details {
          background: #CFC4B6;
          color: #5A4632;
          padding: 8px 16px;
          border-radius: 14px;
          border: none;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          margin-right: 15px; /* moved left from edge */
        }

        .btn.details:hover {
          background: #B5A797;
        }
      `}</style>

      <div className="order-page-container">
        {/* FILTER TABS */}
        <div className="order-tabs">
          {["All", "Processing", "Shipped", "Delivered"].map((t) => (
            <button
              key={t}
              className={`order-tab ${tab === t ? "active" : ""}`}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </div>

        {/* ORDER CARDS */}
        {filteredOrders.map((order, index) => (
          <div key={index} className="order-card">
            <div className="order-header">
              <div>
                <h3>ORD-{String(index + 1).padStart(3, "0")}</h3>
                <span className="order-date">{order.date}</span>
              </div>

              <span className={`status-badge ${order.status.toLowerCase()}`}>
                {order.status}
              </span>
            </div>

            {/* ITEMS */}
            <div className="order-items">
              {order.items.map((item, i) => (
                <div key={i} className="order-item">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span className="dot"></span>
                    <span>
                      {item.qty}x {item.name}
                    </span>
                  </div>
                  <span className="price">₱ {item.price.toLocaleString()}</span>
                </div>
              ))}
            </div>

            {/* FOOTER */}
            <div className="order-footer">
              <div>
                <small>Total Amount</small>
                <h3>₱ {order.total.toLocaleString()}</h3>
              </div>

              <button className="btn details">Details</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
