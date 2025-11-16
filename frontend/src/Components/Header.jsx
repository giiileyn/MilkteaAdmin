import React from "react";
import { FaSearch, FaUserCircle } from "react-icons/fa";

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <FaUserCircle className="profile-icon" />
      </div>

      <div className="header-center">
        <div className="search-container">
          <input type="text" placeholder="Search..." />
          <FaSearch className="search-icon" />
        </div>
        <nav className="nav-links">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/users">Users</a>
          <a href="/products">Products</a>
        </nav>
      </div>

      <div className="header-right">
        <FaUserCircle className="profile-icon" />
      </div>

      <style>{`
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 50px; /* More side padding for spacious look */
          background-color: #3e2c26;
          color: #e0d6c1;
          font-family: Arial, sans-serif;
        }

        .profile-icon {
          font-size: 28px;
          cursor: pointer;
        }

        .header-center {
          display: flex;
          flex-direction: column;
          flex: 1; /* Take up remaining space */
          margin: 0 30px;
          align-items: stretch; /* Make children span full width */
        }

        .search-container {
          position: relative;
          width: 100%; /* Full width inside center */
          max-width: 600px; /* Optional: limit max width */
          margin-bottom: 10px;
        }

        .search-container input {
          width: 100%;
          padding: 10px 35px 10px 15px;
          border-radius: 25px;
          border: none;
          outline: none;
          font-size: 16px;
          background-color: #c2b89b;
          color: #3e2c26;
        }

        .search-icon {
          position: absolute;
          right: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: #3e2c26;
        }

        .nav-links {
          display: flex;
          justify-content: space-around; /* Spread links evenly */
          flex-wrap: wrap;
          gap: 15px;
        }

        .nav-links a {
          text-decoration: none;
          color: #e0d6c1;
          font-weight: bold;
          font-size: 16px;
          transition: color 0.3s;
        }

        .nav-links a:hover {
          color: #b78563;
        }

        @media (max-width: 768px) {
          .header {
            flex-direction: column;
            align-items: stretch;
          }
          .header-center {
            margin: 10px 0;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
