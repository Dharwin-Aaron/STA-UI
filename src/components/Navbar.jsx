import React, { useState } from 'react';
import '../styles/navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  const menuItems = [
    'List Of Values',
    'Data Type',
    'Field',
    'Project Mapping',
    'Sheet Rule',
    'Sheet Rule Group',
    'Standard Image Background Remover',
    'Image Process Profile Entity',
    'Image Processor By Profile',
    'Batch Image Processor Zip',
    'Snap Sheet',
    'Snap Chain',
    'Snap Export',
  ];
console.log('menu rendered',menuItems);
console.log("Navbar component is rendering");
  return (
    <div className={`navbar ${isOpen ? 'open' : 'closed'}`}>
      <div className="navbar-header">
        <div className="logo">ANTON</div>
        <button className="toggle-btn" onClick={toggleNavbar}>
          ☰
        </button>
      </div>
      <ul className="menu">
        {menuItems.map((item, index) => (
          <li key={index} className="menu-item">{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
