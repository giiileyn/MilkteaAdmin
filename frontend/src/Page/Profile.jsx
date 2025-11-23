import React from "react";
import profilePic from "../assets/milkymoodreceipt.png";

export default function Profile() {
  return (
    <div className="profile-container">
      <aside className="sidebar">
        <div className="profile-image">
          <img src={profilePic} alt="Profile" />
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li className="active">Dashboard</li>
            <li>Account Details</li>
            <li>Change Password</li>
            <li>Logout</li>
          </ul>
        </nav>
      </aside>
      <main className="profile-main">
        <h2>Account Settings</h2>
        <form className="profile-form">
          <label>Email address</label>
          <input type="email" value="support@profilepress.net" readOnly />

          <label>First name</label>
          <input type="text" value="John" />

          <label>Last name</label>
          <input type="text" value="Doe" />

          <label>Website</label>
          <input type="url" value="https://profilepress.net" />

          <label>Facebook</label>
          <input type="url" value="https://www.facebook.com/profilepress" />

          <label>Twitter</label>
          <input type="url" value="https://twitter.com/profilepress" />

          <button type="submit">Update Profile</button>
        </form>
      </main>

      {/* CSS-in-JS */}
      <style>{`
        /* General Layout */
        .profile-container {
          display: flex;
          font-family: 'Arial', sans-serif;
          background: #fff0f5; /* light milk tea background */
          min-height: 100vh;
          width: 100vw;       /* full viewport width */
          max-width: 100%;
          overflow-x: hidden;  /* prevent horizontal scroll */
        }

        /* Sidebar */
        .sidebar {
          width: 220px;
          background: #d1a37f; /* milk tea brown */
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          color: white;
        }

        .profile-image img {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          border: 3px solid #fff;
          margin-bottom: 20px;
        }

        .sidebar-nav ul {
          list-style: none;
          padding: 0;
          width: 100%;
        }

        .sidebar-nav li {
          padding: 10px 15px;
          margin: 5px 0;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.3s;
        }

        .sidebar-nav li.active,
        .sidebar-nav li:hover {
          background: #f3c6a9;
          color: #333;
        }

        /* Main Profile Form */
        .profile-main {
          flex: 1;
          padding: 40px;
        }

        .profile-main h2 {
          margin-bottom: 20px;
          color: #8b4513; /* dark brown for text */
        }

        .profile-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .profile-form label {
          font-weight: bold;
          color: #5a2d0c;
        }

        .profile-form input {
          padding: 10px;
          border: 1px solid #d1a37f;
          border-radius: 8px;
          outline: none;
          font-size: 14px;
        }

        .profile-form button {
          padding: 10px;
          background: #b97f60;
          border: none;
          color: white;
          font-weight: bold;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.3s;
        }

        .profile-form button:hover {
          background: #8b5a3c;
        }
      `}</style>
    </div>
  );
}
