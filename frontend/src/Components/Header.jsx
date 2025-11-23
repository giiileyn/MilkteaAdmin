import React from "react";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import logo from "../assets/milkymood.jpg"; // adjust path relative to Header.jsx

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <img src={logo} alt="Logo" className="logo" />
      </div>

      <div className="header-center">
        <div className="search-container">
          <input type="text" placeholder="Search..." />
          <FaSearch className="search-icon" />
        </div>
      </div>

      <div className="header-right">
        <FaUserCircle className="profile-icon" />
      </div>

      <style>{`
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 50px;
          background-color: #3e2c26;
          color: #e0d6c1;
          font-family: Arial, sans-serif;
        }

        .logo {
          height: 80px;
          width: 80px; /* make it square */
          border-radius: 50%; /* make it circular */
          object-fit: cover; /* ensures image fits nicely */
        }

        .profile-icon {
          font-size: 28px;
          cursor: pointer;
        }

        .header-center {
          display: flex;
          flex-direction: column;
          flex: 1;
          margin: 0 30px;
          align-items: stretch;
        }

        .search-container {
          position: relative;
          width: 100%;
          max-width: 600px;
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
