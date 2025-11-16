import React, { useState } from "react";
import { FaHome, FaUsers, FaUser, FaShoppingCart } from "react-icons/fa";
import { MdInventory2, MdKeyboardArrowDown } from "react-icons/md";
import { GiCupcake } from "react-icons/gi";
import { BiCategoryAlt } from "react-icons/bi";

const Sidebar = () => {
  const [openInventory, setOpenInventory] = useState(true);
  const [active, setActive] = useState("Inventory");

  return (
    <div
      className="sidebar"
      style={{
        width: "250px",
        minHeight: "100vh",
        backgroundColor: "#4E342E",
        padding: "20px 0",
        color: "#FFEFD9",
        fontFamily: "Poppins, sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Menu Item */}
      <MenuItem
        icon={<FaHome size={20} />}
        label="Home"
        active={active}
        onClick={() => setActive("Home")}
      />

      <MenuItem
        icon={<FaUsers size={20} />}
        label="Customers"
        active={active}
        onClick={() => setActive("Customers")}
      />

      {/* Inventory Dropdown */}
      <div
        className="menu-item"
        onClick={() => setOpenInventory(!openInventory)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "12px 20px",
          cursor: "pointer",
          backgroundColor: active === "Inventory" ? "#FFF4E6" : "transparent",
          color: active === "Inventory" ? "#4E342E" : "#FFEFD9",
          borderLeft:
            active === "Inventory" ? "5px solid #FFB6C1" : "5px solid transparent",
          transition: "0.2s",
        }}
      >
        <MdInventory2 size={22} />
        <span style={{ fontWeight: "600" }}>Inventory</span>
        <MdKeyboardArrowDown
          size={20}
          style={{
            marginLeft: "auto",
            transform: openInventory ? "rotate(180deg)" : "rotate(0deg)",
            transition: "0.2s",
          }}
        />
      </div>

      {/* Dropdown Items */}
      {openInventory && (
        <div style={{ marginLeft: "40px", marginTop: "5px" }}>
          <DropdownItem
            icon={<GiCupcake size={20} />}
            label="Products"
            active={active}
            onClick={() => setActive("Products")}
          />
          <DropdownItem
            icon={<BiCategoryAlt size={20} />}
            label="Categories"
            active={active}
            onClick={() => setActive("Categories")}
          />
        </div>
      )}

      {/* Orders */}
      <MenuItem
        icon={<FaShoppingCart size={20} />}
        label="Orders"
        active={active}
        onClick={() => setActive("Orders")}
      />

      {/* Profile */}
      <MenuItem
        icon={<FaUser size={20} />}
        label="Profile"
        active={active}
        onClick={() => setActive("Profile")}
      />
    </div>
  );
};

/* COMPONENTS -------------------------------------------------- */
const MenuItem = ({ icon, label, active, onClick }) => (
  <div
    onClick={onClick}
    style={{
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "12px 20px",
      cursor: "pointer",
      backgroundColor: active === label ? "#FFF4E6" : "transparent",
      color: active === label ? "#4E342E" : "#FFEFD9",
      borderLeft:
        active === label ? "5px solid #FFB6C1" : "5px solid transparent",
      transition: "0.2s",
    }}
  >
    {icon}
    <span style={{ fontWeight: 600 }}>{label}</span>
  </div>
);

const DropdownItem = ({ icon, label, active, onClick }) => (
  <div
    onClick={onClick}
    style={{
      display: "flex",
      alignItems: "center",
      gap: "10px",
      padding: "10px 0",
      cursor: "pointer",
      color: active === label ? "#FFB6C1" : "#FFEFD9",
      fontWeight: active === label ? "700" : "500",
      transition: "0.2s",
    }}
  >
    {icon}
    <span>{label}</span>
  </div>
);

export default Sidebar;
