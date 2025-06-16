// App.js
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import TopBar from './components/TopBar';
import Table from './components/Table';
import SheetRuleCreator from './components/SheetRuleCreator';
import './styles/navbar.css'; // Assuming your navbar styles are here

const App = () => {
  const [heading, setHeading] = useState('Home');
  const [currentView, setCurrentView] = useState('home');
  const [editingRowData, setEditingRowData] = useState(null);

  // Handles the "Back" button click in TopBar
  const handleBack = () => {
    console.log('Back button clicked');
    if (currentView === 'sheetRuleCreator') {
      setCurrentView('table');
      setEditingRowData(null);
      setHeading('Sheet Rule Table');
    } else {
      setCurrentView('home');
      setHeading('Home');
    }
  };

  // Handles the "Close" button click in TopBar (when not in SheetRuleCreator)
  const handleClose = () => {
    console.log('Close button clicked');
    setCurrentView('home');
    setEditingRowData(null);
    setHeading('Home');
  };

  // NEW: Handles the "Save" button click in TopBar (when in SheetRuleCreator)
  const handleSave = () => {
    console.log('Save button clicked');
    // In a real application, you'd save the data from SheetRuleCreator here.
    // For now, we'll just switch back to the table view.
    setCurrentView('table');
    setEditingRowData(null); // Clear editing data after saving
    setHeading('Sheet Rule Table'); // Go back to table heading
  };

  // Function passed to Navbar to display the table
  const handleShowTable = () => {
    setCurrentView('table');
    setHeading('Sheet Rule Table');
  };

  // Function passed to Table when an "Edit" button is clicked
  const handleEditRule = (rowData) => {
    setEditingRowData(rowData);
    setCurrentView('sheetRuleCreator');
    setHeading(`Edit: ${rowData.name}`);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Inter, sans-serif' }}>
      <Navbar setHeading={setHeading} setShowTable={handleShowTable} />

      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, backgroundColor: '#f0f2f5' }}>
        {/* Pass currentView and handleSave to TopBar */}
        <TopBar
          heading={heading}
          onBack={handleBack}
          onClose={handleClose} // This will be used when not in sheetRuleCreator
          onSave={handleSave} // This will be used when in sheetRuleCreator
          currentView={currentView} // Pass currentView to TopBar
        />

        {currentView === 'home' && (
          <div style={{ flex: 1, padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <h1 style={{ color: '#333', fontSize: '2.5em', marginBottom: '10px' }}>Hello! 🌟</h1>
            <p style={{ color: '#555', fontSize: '1.2em', marginBottom: '5px' }}>Welcome to STA-UI 🚀</p>
            <p style={{ color: '#777', fontSize: '1em', textAlign: 'center', maxWidth: '600px' }}>
              This is a simple React application to demonstrate the dynamic display of components.
              Use the navigation to explore!
            </p>
          </div>
        )}

        {currentView === 'table' && (
          <Table onEdit={handleEditRule} />
        )}

        {currentView === 'sheetRuleCreator' && (
          <SheetRuleCreator initialData={editingRowData} />
        )}
      </div>
    </div>
  );
};

export default App;
