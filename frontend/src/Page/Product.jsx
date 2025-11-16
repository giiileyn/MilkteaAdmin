import React from "react";

const Product = () => {
  const products = [
    {
      id: 1,
      name: "Organic Tomatoes",
      category: "Vegetables",
      stock: 45,
      price: "₱ 120.00",
      profit: "₱ 40.00",
      status: "In Stock",
      image: "/tomato.png",
    },
    {
      id: 2,
      name: "Organic Tomatoes",
      category: "Vegetables",
      stock: 45,
      price: "₱ 120.00",
      profit: "₱ 40.00",
      status: "Low Stock",
      image: "/tomato.png",
    },
    {
      id: 3,
      name: "Organic Tomatoes",
      category: "Vegetables",
      stock: 45,
      price: "₱ 120.00",
      profit: "₱ 40.00",
      status: "Out of Stock",
      image: "/tomato.png",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "In Stock":
        return "#7BBF84";
      case "Low Stock":
        return "#E3B341";
      case "Out of Stock":
        return "#D26A5B";
      default:
        return "#A67C52";
    }
  };

  return (
    <div className="product-container">
      <h2>Manage your products</h2>

      <div className="search-box">
        <input type="text" placeholder="Search products.." />
      </div>

      <div className="filter-row">
        <button className="filter-btn active">All (4)</button>
        <button className="filter-btn">Low Stock (1)</button>
        <button className="filter-btn">Out of Stock (1)</button>
        <button className="add-btn">+ Add Product</button>
      </div>

      <div className="product-list">
        {products.map((p) => (
          <div key={p.id} className="product-card">
            <img src={p.image} className="product-img" alt="product" />
            <div className="product-info">
              <h3>{p.name}</h3>
              <span className="category">{p.category}</span>
              <p className="stock">Stock: {p.stock} kg</p>
              <p className="price">{p.price}</p>
            </div>

            <div className="right-info">
              <span
                className="status"
                style={{ backgroundColor: getStatusColor(p.status) }}
              >
                {p.status}
              </span>
              <p className="profit">Profit: {p.profit}</p>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        /* Force full width */
        .product-container {
          padding: 30px;
          background: #F8F4EC;
          color: #4B3A2F;
          font-family: 'Inter', sans-serif;
          width: 100vw; /* full viewport width */
          max-width: 100%; /* prevent scroll */
          box-sizing: border-box;
          overflow-x: hidden; /* prevent horizontal scroll */
        }

        h2 {
          font-size: 22px;
          font-weight: 600;
          margin-bottom: 20px;
        }

        .search-box {
          background: #E8E0D2;
          border-radius: 50px;
          padding: 12px 20px;
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          width: 100%;
        }
        .search-box input {
          width: 100%;
          border: none;
          background: none;
          outline: none;
          font-size: 15px;
          color: #4B3A2F;
        }

        .filter-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .filter-btn {
          padding: 8px 16px;
          border-radius: 20px;
          border: 1px solid #CBB8A0;
          background: transparent;
          cursor: pointer;
          font-size: 14px;
          color: #4B3A2F;
        }
        .filter-btn.active {
          background: #A67C52;
          color: #fff;
          border: none;
        }

        .add-btn {
          margin-left: auto;
          padding: 8px 18px;
          background: #A67C52;
          border: none;
          border-radius: 20px;
          color: white;
          font-size: 14px;
          cursor: pointer;
        }

        .product-list {
          display: flex;
          flex-direction: column;
          gap: 18px;
          width: 100%;
        }

        .product-card {
          background: white;
          border: 2px solid #CBB8A0;
          border-radius: 14px;
          padding: 15px;
          display: flex;
          align-items: center;
          width: 100%;
          box-sizing: border-box;
        }

        .product-img {
          width: 80px;
          height: 80px;
          object-fit: cover;
          margin-right: 20px;
        }

        .product-info h3 {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 4px;
        }
        .category {
          font-size: 14px;
          opacity: 0.7;
        }
        .stock {
          margin-top: 5px;
          font-size: 14px;
        }
        .price {
          color: #7BBF84;
          font-size: 16px;
          font-weight: 600;
          margin-top: 5px;
        }

        .right-info {
          margin-left: auto;
          text-align: right;
        }

        .status {
          padding: 6px 12px;
          border-radius: 12px;
          color: white;
          font-size: 12px;
        }

        .profit {
          margin-top: 10px;
          font-size: 14px;
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
};

export default Product;
