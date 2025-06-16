// components/TopBar.js
import React from 'react';
import '../styles/topbar.css'; // Changed import path as per your new provided code

// TopBar component now accepts 'onSave' and 'currentView' props
const TopBar = ({ heading, onBack, onClose, onSave, currentView }) => {
  // Determine if we are in the SheetRuleCreator view
  const isSheetRuleCreator = currentView === 'sheetRuleCreator';

  return (
    <div className="top-bar">
      {/* Heading - Moved to the beginning of the flex container for simpler centering with flex-grow */}
      <h1>{heading}</h1>

      {/* Buttons - Grouped together and pushed to the right */}
      <div className="button-group-right"> {/* New div to group buttons */}
        <button className="back-button" onClick={onBack}>
          Back
        </button>
        <button
          className="close-button"
          // If in SheetRuleCreator, onClick calls onSave; otherwise, calls onClose
          onClick={isSheetRuleCreator ? onSave : onClose}
        >
          {/* If in SheetRuleCreator, button text is "Save"; otherwise, "Close" */}
          {isSheetRuleCreator ? 'Save' : 'Close'}
        </button>
      </div>
    </div>
  );
};

export default TopBar;
