import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("Account Details"); // Only two tabs now
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;

    try {
      const userObj = JSON.parse(storedUser);
      setUser(userObj);
    } catch (err) {
      console.error("Failed to parse user from localStorage:", err);
    }
  }, []);

  if (!user) return <p>Loading profile...</p>;

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setError("");
    setSuccess("");
  };

  const handleLogout = () => {
    localStorage.clear(); // Clear all localStorage
    navigate("/"); // Redirect to home/login
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // TODO: Add profile update logic here
    setSuccess("Profile updated successfully!");
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    // TODO: Send password update request to backend
    setSuccess("Password updated successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="profile-container">
      <aside className="sidebar">
        <div className="profile-image">
          <img src={user.avatar || "https://via.placeholder.com/100"} alt="Profile" />
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li
              className={activeTab === "Account Details" ? "active" : ""}
              onClick={() => handleTabClick("Account Details")}
            >
              Account Details
            </li>
            <li
              className={activeTab === "Change Password" ? "active" : ""}
              onClick={() => handleTabClick("Change Password")}
            >
              Change Password
            </li>
            <li onClick={handleLogout}>Logout</li>
          </ul>
        </nav>
      </aside>

      <main className="profile-main">
        {activeTab === "Account Details" && (
          <>
            <h2>Account Settings</h2>
            {success && <p style={{ color: "green" }}>{success}</p>}
            <form className="profile-form" onSubmit={handleProfileUpdate}>
              <label>Email address</label>
              <input type="email" value={user.email || ""} readOnly />

              <label>Full name</label>
              <input type="text" defaultValue={user.name || ""} />

              <button type="submit">Update Profile</button>
            </form>
          </>
        )}

        {activeTab === "Change Password" && (
          <>
            <h2>Change Password</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
            <form className="profile-form" onSubmit={handlePasswordUpdate}>
              <label>Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />

              <label>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />

              <label>Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />

              <button type="submit">Update Password</button>
            </form>
          </>
        )}
      </main>

      <style>{`
        .profile-container { display: flex; font-family: 'Arial'; background: #fff0f5; min-height: 100vh; width: 100vw; overflow-x: hidden; }
        .sidebar { width: 220px; background: #d1a37f; padding: 20px; display: flex; flex-direction: column; align-items: center; color: white; }
        .profile-image img {
        width: 120px;        /* fixed width */
        height: 120px;       /* same as width to keep circle */
        border-radius: 50%;  /* make it a circle */
        border: 3px solid #fff;
        margin-bottom: 20px;
        object-fit: cover;   /* ensures image covers circle without stretching */
        }

        .sidebar-nav ul { list-style: none; padding: 0; width: 100%; }
        .sidebar-nav li { padding: 10px 15px; margin: 5px 0; border-radius: 8px; cursor: pointer; transition: background 0.3s; }
        .sidebar-nav li.active, .sidebar-nav li:hover { background: #f3c6a9; color: #333; }
        .profile-main { flex: 1; padding: 40px; }
        .profile-main h2 { margin-bottom: 20px; color: #8b4513; }
        .profile-form { display: flex; flex-direction: column; gap: 15px; }
        .profile-form label { font-weight: bold; color: #5a2d0c; }
        .profile-form input { padding: 10px; border: 1px solid #d1a37f; border-radius: 8px; outline: none; font-size: 14px; }
        .profile-form button { padding: 10px; background: #b97f60; border: none; color: white; font-weight: bold; border-radius: 8px; cursor: pointer; transition: background 0.3s; }
        .profile-form button:hover { background: #8b5a3c; }
      `}</style>
    </div>
  );
}
