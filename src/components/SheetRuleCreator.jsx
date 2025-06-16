// components/SheetRuleCreator.js
import React, { useState, useEffect } from 'react';
import '../styles/sheetrulecreator.css';

const SheetRuleCreator = ({ initialData }) => {
  // State for general rule details
  const [ruleName, setRuleName] = useState('');
  const [ruleDesc, setRuleDesc] = useState('');
  const [ruleCategory, setRuleCategory] = useState('default');
  const [sourceType, setSourceType] = useState('sheet_column');
  const [sourceColumnName, setSourceColumnName] = useState('');
  const [sourceDataType, setSourceDataType] = useState('any');
  const [checkType, setCheckType] = useState('of');
  const [ruleModel, setRuleModel] = useState('Condition -> Destination -> Action');

  // State for Conditions (initialize with a default or empty array)
  const [conditions, setConditions] = useState([{ id: 1, condition: 'NONE', data: '' }]);
  const [nextConditionId, setNextConditionId] = useState(2);

  // State for Destination Columns
  const [destinations, setDestinations] = useState([{ id: 1, destination: 'SELF' }]);
  const [nextDestinationId, setNextDestinationId] = useState(2);

  // State for Actions
  const [actions, setActions] = useState([{ id: 1, action: 'NONE' }]);
  const [nextActionId, setNextActionId] = useState(2);

  // State for Preview
  const [previewInput, setPreviewInput] = useState('');
  const [previewOutput, setPreviewOutput] = useState('SATISFIED');
  const [previewMessage, setPreviewMessage] = useState('Warning: Destination May Not be set');
  const [previewDestinations, setPreviewDestinations] = useState('');

  useEffect(() => {
    if (initialData) {
      setRuleName(initialData.name || '');
      setRuleCategory(initialData.category || 'default');
      // For a real application, you'd parse more complex initialData
      // For now, these are just illustrative based on your mockData structure.
      // You'd need to expand initialData to include ruleDesc, sourceType, etc.
      // if you want them pre-filled from mockData.
      setRuleDesc(initialData.description || '');
      setSourceColumnName(initialData.sourceColumn || '');
      // Example for conditions/destinations/actions if they were in mockData
      // setConditions(initialData.conditions ? initialData.conditions.map((item, idx) => ({ id: idx + 1, ...item })) : [{ id: 1, condition: 'NONE', data: '' }]);
      // setNextConditionId(initialData.conditions ? initialData.conditions.length + 1 : 2);
    } else {
      // Reset all fields when initialData is null (e.g., creating a new rule)
      setRuleName('');
      setRuleDesc('');
      setRuleCategory('default');
      setSourceType('sheet_column');
      setSourceColumnName('');
      setSourceDataType('any');
      setCheckType('of');
      setRuleModel('Condition -> Destination -> Action');
      setConditions([{ id: 1, condition: 'NONE', data: '' }]);
      setNextConditionId(2);
      setDestinations([{ id: 1, destination: 'SELF' }]);
      setNextDestinationId(2);
      setActions([{ id: 1, action: 'NONE' }]);
      setNextActionId(2);
      setPreviewInput('');
      setPreviewOutput('SATISFIED');
      setPreviewMessage('Warning: Destination May Not be set');
      setPreviewDestinations('');
    }
  }, [initialData]);

  const addCondition = () => {
    setConditions([...conditions, { id: nextConditionId, condition: 'NONE', data: '' }]);
    setNextConditionId(nextConditionId + 1);
  };

  const clearConditions = () => {
    setConditions([]);
    setNextConditionId(1);
  };

  const handleConditionChange = (id, field, value) => {
    setConditions(conditions.map(cond =>
      cond.id === id ? { ...cond, [field]: value } : cond
    ));
  };

  const addDestination = () => {
    setDestinations([...destinations, { id: nextDestinationId, destination: 'SELF' }]);
    setNextDestinationId(nextDestinationId + 1);
  };

  const clearDestinations = () => {
    setDestinations([]);
    setNextDestinationId(1);
  };

  const handleDestinationChange = (id, value) => {
    setDestinations(destinations.map(dest =>
      dest.id === id ? { ...dest, destination: value } : dest
    ));
  };

  const addAction = () => {
    setActions([...actions, { id: nextActionId, action: 'NONE' }]);
    setNextActionId(nextActionId + 1);
  };

  const clearActions = () => {
    setActions([]);
    setNextActionId(1);
  };

  const handleActionChange = (id, value) => {
    setActions(actions.map(action =>
      action.id === id ? { ...action, action: value } : action
    ));
  };


  return (
    <div className="sheet-rule-creator-container">
      <div className="main-content">
        <div className="form-section creator-form">
          <h2>Sheet Rule Creator</h2>
          {/* New div for scrollable content */}
          <div className="scrollable-form-content">
            {/* Rule Name */}
            <div className="form-group">
              <label htmlFor="ruleName">Rule Name *</label>
              <input
                type="text"
                id="ruleName"
                value={ruleName}
                onChange={(e) => setRuleName(e.target.value)}
              />
            </div>

            {/* Rule Desc */}
            <div className="form-group">
              <label htmlFor="ruleDesc">Rule Desc</label>
              <input
                type="text"
                id="ruleDesc"
                value={ruleDesc}
                onChange={(e) => setRuleDesc(e.target.value)}
              />
            </div>

            {/* Rule Category */}
            <div className="form-group">
              <label htmlFor="ruleCategory">Rule Category *</label>
              <select
                id="ruleCategory"
                value={ruleCategory}
                onChange={(e) => setRuleCategory(e.target.value)}
              >
                <option value="default">default</option>
                {/* Add more options as needed */}
              </select>
            </div>

            {/* Source Type */}
            <div className="form-group">
              <label htmlFor="sourceType">Source Type *</label>
              <select
                id="sourceType"
                value={sourceType}
                onChange={(e) => setSourceType(e.target.value)}
              >
                <option value="sheet_column">sheet_column</option>
                {/* Add other source types like 'fixed_value', 'formula', etc. */}
              </select>
              {sourceType === 'sheet_column' && (
                <p className="hint-text">
                  For Multi-column, separate column names with Double Semi Column (;;) Example: Column1;; Column2
                </p>
              )}
            </div>

            {/* Source Column Name */}
            <div className="form-group">
              <label htmlFor="sourceColumnName">Source Column Name *</label>
              <input
                type="text"
                id="sourceColumnName"
                value={sourceColumnName}
                onChange={(e) => setSourceColumnName(e.target.value)}
              />
            </div>

            {/* Source Data Type */}
            <div className="form-group">
              <label htmlFor="sourceDataType">Source Data Type *</label>
              <select
                id="sourceDataType"
                value={sourceDataType}
                onChange={(e) => setSourceDataType(e.target.value)}
              >
                <option value="any">Any</option>
                {/* Add more data types */}
              </select>
            </div>

            {/* Check Type */}
            <div className="form-group">
              <label htmlFor="checkType">Check Type *</label>
              <select
                id="checkType"
                value={checkType}
                onChange={(e) => setCheckType(e.target.value)}
              >
                <option value="of">of</option>
                {/* Add more check types */}
              </select>
            </div>

            {/* Rule Model */}
            <div className="form-group">
              <label htmlFor="ruleModel">Rule Model *</label>
              <select
                id="ruleModel"
                value={ruleModel}
                onChange={(e) => setRuleModel(e.target.value)}
              >
                <option value="Condition -> Destination -> Action">Condition - Destination - Action</option>
                {/* Add more rule models */}
              </select>
            </div>

            {/* CONDITIONS Section */}
            <div className="form-section conditions-section bordered-section">
              <h3>CONDITIONS</h3>
              {conditions.map((cond) => (
                <div key={cond.id} className="condition-row">
                  <div className="form-group">
                    <label htmlFor={`condition-${cond.id}`}>Condition</label>
                    <select
                      id={`condition-${cond.id}`}
                      value={cond.condition}
                      onChange={(e) => handleConditionChange(cond.id, 'condition', e.target.value)}
                    >
                      <option value="NONE">NONE</option>
                      {/* Add more condition types */}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor={`data-${cond.id}`}>Data *</label>
                    <input
                      type="text"
                      id={`data-${cond.id}`}
                      value={cond.data}
                      onChange={(e) => handleConditionChange(cond.id, 'data', e.target.value)}
                    />
                  </div>
                </div>
              ))}
              <div className="button-group">
                <button className="add-button" onClick={addCondition}>ADD CONDITION</button>
                <button className="clear-button" onClick={clearConditions}>CLEAR CONDITIONS</button>
              </div>
            </div>

            {/* DESTINATION COLUMNS Section */}
            <div className="form-section destination-columns-section bordered-section">
              <h3>DESTINATION COLUMNS</h3>
              {destinations.map((dest) => (
                <div key={dest.id} className="destination-row">
                  <div className="form-group">
                    <label htmlFor={`destination-${dest.id}`}>DESTINATION</label>
                    <select
                      id={`destination-${dest.id}`}
                      value={dest.destination}
                      onChange={(e) => handleDestinationChange(dest.id, e.target.value)}
                    >
                      <option value="SELF">SELF</option>
                      {/* Add more destination types */}
                    </select>
                    {dest.destination === 'SELF' && (
                      <p className="hint-text">Targets the selected source column as destination</p>
                    )}
                  </div>
                </div>
              ))}
              <div className="button-group">
                <button className="add-button blue" onClick={addDestination}>ADD DESTINATION</button>
                <button className="clear-button red" onClick={clearDestinations}>CLEAR ALL DESTINATION</button>
              </div>
            </div>

            {/* ACTIONS Section */}
            <div className="form-section actions-section bordered-section">
              <h3>ACTIONS</h3>
              {actions.map((act) => (
                <div key={act.id} className="action-row">
                  <div className="form-group">
                    <label htmlFor={`action-${act.id}`}>ACTION</label>
                    <select
                      id={`action-${act.id}`}
                      value={act.action}
                      onChange={(e) => handleActionChange(act.id, e.target.value)}
                    >
                      <option value="NONE">NONE</option>
                      {/* Add more action types */}
                    </select>
                  </div>
                </div>
              ))}
              <div className="button-group">
                <button className="add-button green" onClick={addAction}>ADD ACTION</button>
                <button className="clear-button red" onClick={clearActions}>CLEAR ALL ACTIONS</button>
              </div>
            </div>
          </div> {/* End of scrollable-form-content */}
        </div>

        {/* PREVIEW Section (This remains fixed) */}
        <div className="preview-section">
          <h3>PREVIEW</h3>
          <p className="preview-note">
            Note: Preview will only work for a subset of rules. It will not work for rules containing copy data from another column or connect or Similar rules. May show undefined or null in case of rules that reference another column since there are no another columns in preview. But it should work when used in sheets.
          </p>

          <div className="form-group">
            <label htmlFor="previewInput">Input</label>
            <input
              type="text"
              id="previewInput"
              value={previewInput}
              onChange={(e) => setPreviewInput(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Output</label>
            <p className="hint-text">Note: If output is empty check if you added a copy source action first</p>
            <textarea
              readOnly
              value={`MESSAGE    ${previewMessage}\nCONDITION  ${previewOutput}\nOUTPUT\nDESTINATIONS ${previewDestinations}`}
              rows="4"
              className="preview-output-textarea"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SheetRuleCreator;
