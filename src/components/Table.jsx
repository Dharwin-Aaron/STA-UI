// components/Table.js
import React, { useState } from "react";
import "../styles/table.css"; // Ensure this path is correct
import { mockData } from "../mockdata"; // Make sure mockData is accessible

// ConfirmationModal component (Assuming you already have this, kept for completeness)
const ConfirmationModal = ({ show, message, onConfirm, onCancel }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <div className="modal-actions">
          <button onClick={onConfirm} className="modal-btn confirm-btn">Yes</button>
          <button onClick={onCancel} className="modal-btn cancel-btn">No</button>
        </div>
      </div>
    </div>
  );
};

// Table component now accepts an 'onEdit' prop
const Table = ({ onEdit }) => {
  const [data, setData] = useState(mockData);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });

  // State for the delete confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);

  // Icon components
  const DuplicateIcon = () => (
    <button className="icon-btn duplicate" title="Duplicate">📄</button>
  );

  // EditIcon now accepts an onClick prop
  const EditIcon = ({ onClick }) => (
    <button className="icon-btn edit" title="Edit" onClick={onClick}>✏️</button>
  );

  // DeleteIcon now accepts an onClick prop
  const DeleteIcon = ({ onClick }) => (
    <button className="icon-btn delete" title="Delete" onClick={onClick}>🗑️</button>
  );

  // Sorting logic
  const requestSort = (key) => {
    let direction = sortConfig.key === key && sortConfig.direction === "ascending" ? "descending" : "ascending";
    setSortConfig({ key, direction });

    setData([...data].sort((a, b) => (a[key] < b[key] ? (direction === "ascending" ? -1 : 1) : a[key] > b[key] ? (direction === "ascending" ? 1 : -1) : 0)));
  };

  // Handler to open the delete confirmation modal
  const handleDeleteClick = (row) => {
    setRowToDelete(row);
    setShowDeleteModal(true);
  };

  // Handler to confirm deletion
  const confirmDeletion = () => {
    if (rowToDelete) {
      const updatedData = data.filter((row) => row.id !== rowToDelete.id);
      setData(updatedData);
      setRowToDelete(null); // Clear the row to delete
      setShowDeleteModal(false); // Close the modal
    }
  };

  // Handler to cancel deletion
  const cancelDeletion = () => {
    setRowToDelete(null); // Clear the row to delete
    setShowDeleteModal(false); // Close the modal
  };

  return (
    <div className="table-container">
      <table className="styled-table">
        <thead>
          <tr>
            <th>#</th>
            <th onClick={() => requestSort("name")}>Name</th>
            <th onClick={() => requestSort("category")}>Category</th>
            <th onClick={() => requestSort("createdOn")}>Created On</th>
            <th>Duplicate</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={row.id}>
              <td>{index + 1}</td>
              <td>{row.name}</td>
              <td>{row.category}</td>
              <td>{row.createdOn}</td>
              <td><DuplicateIcon /></td>
              {/* Call the onEdit prop with the current row data when EditIcon is clicked */}
              <td><EditIcon onClick={() => onEdit(row)} /></td>
              {/* Call the handleDeleteClick with the current row data when DeleteIcon is clicked */}
              <td><DeleteIcon onClick={() => handleDeleteClick(row)} /></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Render the ConfirmationModal */}
      <ConfirmationModal
        show={showDeleteModal}
        message={`Are you sure you want to delete "${rowToDelete?.name}"?`}
        onConfirm={confirmDeletion}
        onCancel={cancelDeletion}
      />
    </div>
  );
};

export default Table;
