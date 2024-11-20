// src/components/PartnerRegistrationForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const PartnerRegistrationForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        status: 'active', // Default status
        currentLoad: 0, // Default load
        areas: '',
        shift: {
            start: '',
            end: '',
        },
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'areas') {
            setFormData({
                ...formData,
                areas: value.split(',').map(area => area.trim()), // Convert comma-separated areas to an array
            });
        } else if (name.startsWith('shift.')) {
            const shiftKey = name.split('.')[1];
            setFormData({
                ...formData,
                shift: {
                    ...formData.shift,
                    [shiftKey]: value,
                },
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        if (formData.currentLoad < 0 || formData.currentLoad > 3) {
            newErrors.currentLoad = 'Current load must be between 0 and 3';
        }
        if (!formData.shift.start || !formData.shift.end) {
            newErrors.shift = 'Both start and end times are required';
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            await axios.post('http://localhost:5000/api/partners', {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                status: formData.status,
                currentLoad: formData.currentLoad,
                areas: formData.areas,
                shift: formData.shift,
            });

            setSuccessMessage('Partner registration successful!');
            setFormData({
                name: '',
                email: '',
                phone: '',
                status: 'active',
                currentLoad: 0,
                areas: '',
                shift: {
                    start: '',
                    end: '',
                },
            });
            setErrors({});
        } catch (error) {
            console.error('Error:', error);
            setErrors({ submit: 'Failed to register partner. Please try again.' });
        }
    };

    return (
        <div className="partner-registration-form">
            <h2>Partner Registration</h2>
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errors.submit && <p className="error">{errors.submit}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    {errors.name && <p className="error">{errors.name}</p>}
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                </div>
                <div>
                    <label>Phone:</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                                        {errors.phone && <p className="error">{errors.phone}</p>}
                </div>
                <div>
                    <label>Current Load (0-3):</label>
                    <input
                        type="number"
                        name="currentLoad"
                        value={formData.currentLoad}
                        onChange={handleChange}
                        min="0"
                        max="3"
                    />
                    {errors.currentLoad && <p className="error">{errors.currentLoad}</p>}
                </div>
                <div>
                    <label>Areas (comma-separated):</label>
                    <input
                        type="text"
                        name="areas"
                        value={formData.areas}
                        onChange={handleChange}
                    />
                    {errors.areas && <p className="error">{errors.areas}</p>}
                </div>
                <div>
                    <label>Shift Start Time (HH:mm):</label>
                    <input
                        type="time"
                        name="shift.start"
                        value={formData.shift.start}
                        onChange={handleChange}
                    />
                    {errors.shift && <p className="error">{errors.shift}</p>}
                </div>
                <div>
                    <label>Shift End Time (HH:mm):</label>
                    <input
                        type="time"
                        name="shift.end"
                        value={formData.shift.end}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default PartnerRegistrationForm;