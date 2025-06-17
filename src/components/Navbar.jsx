import React, { useState } from 'react';
import '../styles/navbar.css';
import logo from '../assets/sta-logo.png'; // Adjust path as needed


const menuItems = [
  { label: 'Sheet Rule', icon: '📄' },
  { label: 'Sheet Rule Group', icon: '🗂️' },
  { label: 'Snap Sheet', icon: '📸' },
  { label: 'Snap Chain', icon: '🔗' },
  { label: 'Snap Export', icon: '📤' },
];

const Navbar = ({ setHeading, setShowTable }) => {
  const [activeIndex, setActiveIndex] = useState(0); // Default active menu

  const handleMenuClick = (idx, label) => {
    setActiveIndex(idx);
    setHeading(label); // Update top bar title
    setShowTable(label === 'Sheet Rule'); // Show Table only when "Snap Rule"
  };

  return (
    <div className="navbar">
      <div className="navbar-header">
        {/* <img src={logo} alt="Company Logo" className="logo-image" /> */}
        <img src={logo} alt="Logo" className="logo-image" />
         <div className="logo">ANTON</div>
      </div>
      <ul className="menu">
        {menuItems.map((item, idx) => (
          <li 
            key={item.label}
            className={`menu-item${activeIndex === idx ? ' active' : ''}`}
            onClick={() => handleMenuClick(idx, item.label)}
            title={item.label}
          >
            <span className="icon">{item.icon}</span>
            <span className="label">{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;