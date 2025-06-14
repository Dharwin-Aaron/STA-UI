import React from 'react';
import Navbar from './components/Navbar';
import '../styles/navbar.css';

const App = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Navbar />
      <div style={{ padding: '20px', flex: 1 }}>
        <h1>Hello, Dharwin!</h1>
        <p>Welcome to STA-UI 🚀</p>
        <p>This is a simple React application to demonstrate the use of components.</p>
      </div>
    </div>
  );
};

export default App;
