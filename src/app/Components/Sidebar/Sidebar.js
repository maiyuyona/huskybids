"use client";

import React from "react";
import "./styles.css";

const Sidebar = ({ isOpen, onClose }) => {
    return (
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <div className="sidebar-content">
          <h2>Menu</h2>
          <ul>
            <li>Settings</li>
            <li>Change Password</li>
            <li>Change Username</li>
            <li>Betting History</li>
          </ul>
        </div>
      </div>
    );
  };
  
  export default Sidebar;