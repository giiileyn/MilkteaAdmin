import React from "react";

export default function Receipt({ shop, address, tel, items, total, cash, change, payment }) {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.shopName}>{shop}</h2>
        <div style={styles.info}>{address}</div>
        <div style={styles.info}>Telp. {tel}</div>
      </div>

      <div style={styles.separator}>******************************</div>

      <div style={{ textAlign: "center", marginBottom: 10 }}>CASH RECEIPT</div>

      <div style={styles.separator}>******************************</div>

      <div style={styles.itemsHeader}>
        <span style={{ textAlign: "left" }}>Description</span>
        <span style={{ textAlign: "right" }}>Price</span>
      </div>

      {items.map((item, i) => (
        <div key={i} style={styles.itemRow}>
          <span>{item.name}</span>
          <span>{item.price.toFixed(1)}</span>
        </div>
      ))}

      <div style={styles.separator}>******************************</div>

      <div style={styles.totalRow}>
        <span>Total</span>
        <span>{total.toFixed(1)}</span>
      </div>
      <div style={styles.totalRow}>
        <span>Cash</span>
        <span>{cash.toFixed(1)}</span>
      </div>
      <div style={styles.totalRow}>
        <span>Change</span>
        <span>{change.toFixed(1)}</span>
      </div>

      <div style={styles.separator}>******************************</div>

      {payment && payment.type === "bank" && (
        <>
          <div>Bank card --- {payment.last4}</div>
          <div>Approval Code #{payment.code}</div>
          <div style={styles.separator}>******************************</div>
        </>
      )}

      <div style={{ textAlign: "center", fontWeight: "bold" }}>THANK YOU!</div>

      {/* Barcode placeholder */}
      <div style={styles.barcode}>
        <div style={styles.bar}></div>
        <div style={styles.bar}></div>
        <div style={styles.bar}></div>
        <div style={styles.bar}></div>
        <div style={styles.bar}></div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: 300,
    padding: "20px 15px",
    fontFamily: "'Courier New', Courier, monospace",
    fontSize: 14,
    background: "#fff",
    border: "1px dashed #ccc",
    margin: "20px auto",
  },
  header: {
    textAlign: "center",
    marginBottom: 10,
  },
  shopName: {
    margin: 0,
    fontSize: 16,
  },
  info: {
    fontSize: 12,
  },
  separator: {
    textAlign: "center",
    fontSize: 14,
    margin: "5px 0",
  },
  itemsHeader: {
    display: "flex",
    justifyContent: "space-between",
    fontWeight: "bold",
    marginTop: 5,
  },
  itemRow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 2,
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    fontWeight: "bold",
    marginTop: 2,
  },
  barcode: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 15,
  },
  bar: {
    width: 20,
    height: 30,
    background: "#000",
  },
};
