import React, { useEffect, useState } from "react"; 
import AddProductModal from "./AddProductModal";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:4000/products/");
      const data = await res.json();

      const formatted = data.map((p) => ({
        id: p._id,
        name: p.name,
        category: p.category,
        stock: p.stock,
        price: `₱ ${p.price.toFixed(2)}`,
        profit: `₱ 40.00`,
        status:
          p.status === "available"
            ? "In Stock"
            : p.status === "out-of-stock"
            ? "Out of Stock"
            : "Low Stock",
        image: p.image || "/placeholder.png",
      }));

      setProducts(formatted);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  // Fetch categories (for modal)
 const fetchCategories = async () => {
  try {
    const res = await fetch("http://127.0.0.1:5000/api/categories");
    const data = await res.json();
    console.log("Fetched categories:", data);

    setCategories(
      Array.isArray(data)
        ? data.map((c) => ({ id: c.id, name: c.name }))
        : []
    );
  } catch (err) {
    console.error("Error fetching categories:", err);
  }
};



  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

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
        <button className="filter-btn active">All ({products.length})</button>

        <button className="filter-btn">
          Low Stock ({products.filter((p) => p.status === "Low Stock").length})
        </button>

        <button className="filter-btn">
          Out of Stock (
          {products.filter((p) => p.status === "Out of Stock").length})
        </button>

        {/* ADD PRODUCT MODAL BUTTON */}
        <button className="add-btn" onClick={() => setShowModal(true)}>
          + Add Product
        </button>
      </div>

      <div className="product-list">
        {products.map((p) => (
          <div key={p.id} className="product-card">
            <img src={p.image} className="product-img" alt={p.name} />

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

      {/* SHOW MODAL (WITH CATEGORIES PASSED) */}
      {showModal && (
        <AddProductModal
          categories={categories}
          onClose={() => {
            setShowModal(false);
            fetchProducts(); // refresh after adding
          }}
        />
      )}

      {/* STYLES (UNCHANGED) */}
      <style>{`
        .product-container {
          padding: 30px;
          background: #F8F4EC;
          color: #4B3A2F;
          font-family: 'Inter', sans-serif;
          width: 100vw;
          max-width: 100%;
          box-sizing: border-box;
          overflow-x: hidden;
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
