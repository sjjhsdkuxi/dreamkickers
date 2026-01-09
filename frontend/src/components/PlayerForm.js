import React, { useState, useEffect } from 'react';
import './PlayerForm.css';

const PlayerForm = ({ player, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    fileNumber: '',
    contactNumber: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (player) {
      // Format date for input (YYYY-MM-DD)
      const dob = player.dob ? new Date(player.dob).toISOString().split('T')[0] : '';
      setFormData({
        name: player.name || '',
        dob: dob,
        fileNumber: player.fileNumber || '',
        contactNumber: player.contactNumber || ''
      });
    }
  }, [player]);

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.dob) {
      newErrors.dob = 'Date of birth is required';
    }

    if (!formData.fileNumber.trim()) {
      newErrors.fileNumber = 'File number is required';
    }

    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact number is required';
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.contactNumber)) {
      newErrors.contactNumber = 'Please enter a valid contact number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="player-form-container">
      <div className="player-form">
        <h2>{player ? 'Edit Player' : 'Add New Player'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
              placeholder="Enter player name"
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="dob">Date of Birth *</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className={errors.dob ? 'error' : ''}
            />
            {errors.dob && <span className="error-message">{errors.dob}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="fileNumber">File Number *</label>
            <input
              type="text"
              id="fileNumber"
              name="fileNumber"
              value={formData.fileNumber}
              onChange={handleChange}
              className={errors.fileNumber ? 'error' : ''}
              placeholder="Enter file number"
            />
            {errors.fileNumber && <span className="error-message">{errors.fileNumber}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="contactNumber">Contact Number *</label>
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              className={errors.contactNumber ? 'error' : ''}
              placeholder="Enter contact number"
            />
            {errors.contactNumber && <span className="error-message">{errors.contactNumber}</span>}
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-success">
              {player ? 'Update Player' : 'Add Player'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlayerForm;
