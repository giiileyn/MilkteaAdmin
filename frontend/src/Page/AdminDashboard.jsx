import React, { useEffect, useState } from "react";
import AddProductModal from "./AddProductModal";
import AddCategoryModal from "./AddCategoryModal"; 
import AddToppingModal from "./AddToppingModal"; 


export default function AdminDashboard() {
  const [stats, setStats] = useState({
    orders: 0,
    users: 0,
    products: 0,
    totalRevenue: 0,
    topProducts: [],
    recentOrders: [],
  });
  const [lowStock, setLowStock] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showAddToppingModal, setShowAddToppingModal] = useState(false);
  
  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/dashboard/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Error fetching stats:", err));

    fetch("http://127.0.0.1:5000/api/dashboard/low-stock")
      .then((res) => res.json())
      .then((data) => setLowStock(data))
      .catch((err) => console.error("Error fetching low stock:", err));

    // Fetch categories (if still needed for other dashboard features)
    fetch("http://127.0.0.1:5000/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching categories:", err));
  
       fetch("http://localhost:5000/orders")
    .then((res) => res.json())
    .then((orders) => {
      // Map your orders to the format expected in the UI
      const recentOrders = orders.map((o) => ({
        orderId: o.id,
        customerName: o.customerName || "Unknown", // fallback if customerName missing
        totalPrice: o.totalPrice || 0,
        status: o.status || "Pending",
      }));
      setStats((prev) => ({ ...prev, recentOrders }));
    })
    .catch((err) => console.error("Error fetching recent orders:", err));
}, []);

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">
        {/* Top Stats */}
        <div className="stats-container">
          <div className="stat-card orders">
            <div className="stat-icon">🛒</div>
            <div className="stat-info">
              <h2>{stats.orders}</h2>
              <p>Orders</p>
            </div>
          </div>

          <div className="stat-card users">
            <div className="stat-icon">👥</div>
            <div className="stat-info">
              <h2>{stats.users}</h2>
              <p>Customers</p>
            </div>
          </div>

          <div className="stat-card products">
            <div className="stat-icon">🥤</div>
            <div className="stat-info">
              <h2>{stats.products}</h2>
              <p>Products</p>
            </div>
          </div>

          <div className="stat-card revenue">
            <div className="stat-icon">💰</div>
            <div className="stat-info">
              <h2>${stats.totalRevenue.toLocaleString()}</h2>
              <p>Total Revenue</p>
            </div>
          </div>
        </div>

        {/* Top Selling Products */}
        <div className="charts-container">
          <div className="chart-card">
            <h3>Top Selling Products</h3>
            <div className="bar-chart">
              {stats.topProducts?.length > 0 ? (
                stats.topProducts.map((product, i) => (
                  <div className="bar" key={i}>
                    <span>{product.name}</span>
                    <div
                      className="bar-fill"
                      style={{ width: `${product.percentage}%` }}
                    ></div>
                  </div>
                ))
              ) : (
                <p>No product data</p>
              )}
            </div>
          </div>

          <div className="chart-card small-chart">
            <h3>Sales Over Time</h3>
            <div className="line-chart">
              <svg viewBox="0 0 200 120">
                <polyline
                  fill="none"
                  stroke="#ff7fbf"
                  strokeWidth="3"
                  points="20,100 60,80 100,60 140,40 180,20"
                />
                <circle cx="20" cy="100" r="3" fill="#ff7fbf" />
                <circle cx="60" cy="80" r="3" fill="#ff7fbf" />
                <circle cx="100" cy="60" r="3" fill="#ff7fbf" />
                <circle cx="140" cy="40" r="3" fill="#ff7fbf" />
                <circle cx="180" cy="20" r="3" fill="#ff7fbf" />
              </svg>
              <div className="chart-labels">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
              </div>
            </div>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="low-stock-section">
          <h3>Low Stock Alerts</h3>
          <table className="stock-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              {lowStock.length > 0 ? (
                lowStock.map((item, i) => (
                  <tr key={i}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">All stocks are sufficient</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Recent Orders + Business Management */}
        <div className="orders-management-container">

          {/* =========================================================
              =============== UPDATED RECENT ORDERS UI ===============
              ========================================================= */}
          <div className="recent-orders">
            <h3 className="recent-title">Recent Orders</h3>

            <div className="recent-card">
              {stats.recentOrders?.length > 0 ? (
                stats.recentOrders.map((order, i) => (
                  <div key={i} className="recent-order-row">
                    <div className="recent-left">
                      <div className="recent-id">{order.orderId}</div>
                      <div className="recent-name">{order.customerName}</div>
                    </div>

                    <div className="recent-right">
                      <div className="recent-price">
                        ₱{order.totalPrice.toLocaleString()}
                      </div>

                      <div
                        className={`recent-status status-${order.status.toLowerCase()}`}
                      >
                        {order.status}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No recent orders</p>
              )}
            </div>
          </div>

          <div className="business-management">
            <h3>Business Management</h3>
            <div className="management-buttons">
              <button className="btn add-product" onClick={() => setShowAddProductModal(true)}> ➕ Add Product </button>
              <button className="btn add-category" onClick={() => setShowAddCategoryModal(true)}> 🏷 Add Category </button>
              <button className="btn add-topping" onClick={() => setShowAddToppingModal(true)}>🍬 Add Topping </button>
              <button className="btn manage-inventory"> 🏷 Manage Inventory </button>
              <button className="btn sales-reports">📈 Sales Reports</button>
              <button className="btn customers">👥 Customers</button>
            </div>
          </div>
        </div>
         {showAddProductModal && (
      <AddProductModal
        categories={categories}
        onClose={() => setShowAddProductModal(false)}
        onSubmit={(newProduct) => {
          console.log("New Product Submitted:", newProduct);
          setShowAddProductModal(false);
          // Call your API here to save product
        }}
      />
    )}

      {showAddCategoryModal && (
          <AddCategoryModal
            onClose={() => setShowAddCategoryModal(false)}
            onSubmit={(newCategory) => {
              console.log("New Category Submitted:", newCategory);
              setShowAddCategoryModal(false);
            }}
          />
        )}
        {showAddToppingModal && (
          <AddToppingModal
            onClose={() => setShowAddToppingModal(false)}
            onSubmit={(newTopping) => {
              console.log("New Topping Submitted:", newTopping);
              setShowAddToppingModal(false);
            }}
          />
        )}

      </div>


      {/* Embedded Milk Tea Theme CSS */}
      <style>{`
        .dashboard-wrapper {
          width: 100vw;
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          background: linear-gradient(135deg, #fbe4f5 0%, #fff6e8 100%);
          padding: 40px 0;
          font-family: 'Poppins', sans-serif;
        }

        .dashboard-container { width: 95%; max-width: 1500px; color: #3c2c2a; }

        .recent-orders { flex: 1; }
        .recent-title {
          font-size: 22px;
          font-weight: bold;
          margin-bottom: 15px;
          color: #3c2c2a;
        }

        .recent-card {
          background: #ffffff;
          border-radius: 20px;
          padding: 10px 0;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          border: 1px solid #f0e1d6;
        }

        .recent-order-row {
          display: flex;
          justify-content: space-between;
          padding: 14px 20px;
          border-bottom: 1px solid #f3e7df;
        }

        .recent-order-row:last-child {
          border-bottom: none;
        }

        .recent-left { display: flex; flex-direction: column; }
        .recent-id {
          font-weight: 700;
          font-size: 17px;
          color: #7a4f3a; /* deep milktea brown */
        }
        .recent-name {
          font-size: 14px;
          color: #a57c68; /* light brown */
        }

        .recent-right { text-align: right; }
        .recent-price {
          font-weight: 700;
          font-size: 16px;
          color: #8b4f3a;
        }

        .recent-status {
          font-size: 13px;
          margin-top: 4px;
          font-weight: 600;
        }

        .status-completed { color: #4caf50; }
        .status-processing { color: #3f51b5; }
        .status-pending { color: #e8a300; }

        .stats-container { display: flex; justify-content: space-between; gap: 20px; margin-bottom: 30px; }
        .stat-card { flex: 1; background: #fff0e5; border-radius: 20px; padding: 25px; text-align: center; box-shadow: 0 6px 12px rgba(0,0,0,0.1); transition: transform 0.2s ease; }
        .stat-card:hover { transform: translateY(-5px); }
        .stat-icon { font-size: 45px; margin-bottom: 12px; }
        .stat-info h2 { font-size: 28px; }
        .stat-info p { font-size: 14px; color: #6b4b3a; }

        .charts-container { display: flex; gap: 25px; margin-bottom: 30px; }
        .chart-card { flex: 2; background: #fff0e5; border-radius: 20px; padding: 25px; box-shadow: inset 0 0 5px rgba(0,0,0,0.05); }
        .chart-card.small-chart { flex: 1; }
        .bar { display: flex; align-items: center; margin: 12px 0; }
        .bar span { width: 140px; font-size: 14px; color: #5a3a32; }
        .bar-fill { height: 16px; background: #ffb6c1; border-radius: 10px; }
        .line-chart svg { width: 100%; height: 100px; }

        .low-stock-section { background: #fff0e5; border-radius: 20px; padding: 25px; box-shadow: inset 0 0 5px rgba(0,0,0,0.05); margin-bottom: 30px; }
        .stock-table { width: 60%; margin: 15px auto 0; border-collapse: collapse; background-color: #fff7f2; border-radius: 12px; }
        .stock-table th, .stock-table td { padding: 12px 18px; text-align: left; }
        .stock-table th { background-color: #ffdae6; color: #3c2c2a; }

        .orders-management-container { display: flex; gap: 25px; }
        .recent-orders, .business-management { flex: 1; background: #fff7f2; border-radius: 20px; padding: 25px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
        .orders-list { max-height: 400px; overflow-y: auto; }
        .order-item { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #ffe4e9; }
        .order-id { font-weight: bold; color: #8b3a5b; }
        .order-name { color: #5a3a32; }
        .order-price { font-weight: bold; color: #b44b6b; }
        .order-status.completed { color: #4caf50; }
        .order-status.processing { color: #2196f3; }
        .order-status.pending { color: #ff9800; }

        .management-buttons { display: flex; flex-direction: column; gap: 15px; }
        .btn { padding: 14px; border-radius: 15px; border: none; cursor: pointer; font-weight: bold; color: #fff; transition: transform 0.2s ease; }
        .btn:hover { transform: translateY(-3px); }
        .manage-inventory { background: #ffcc99; color: #3c2c2a; }
        .sales-reports { background: #ffb347; }
        .customers { background: #ab47bc; }
        .add-product { background: #ff8c94; color: #3c2c2a; }
        .add-category { background: #ffb347; color: #3c2c2a; }
        .add-topping { background: #f7b733; color: #3c2c2a; }
      `}</style>
    </div>
  );
}
