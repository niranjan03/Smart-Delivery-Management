// src/components/PartnerRegistrationForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Partners from '../pages/Partners';

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
            // Convert comma-separated areas to an array
            setFormData({
                ...formData,
                areas: value.split(',').map(area => area.trim()),
            });
        } else if (name.startsWith('shift.')) {
            // Handle shift time changes
            const shiftKey = name.split('.')[1];
            setFormData({
                ...formData,
                shift: {
                    ...formData.shift,
                    [shiftKey]: value,
                },
            });
        } else {
            // Handle other input changes
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
        // if (!formData.shift.start || !formData.shift.end) {
        //     newErrors.shift = 'Both start and end times are required';
        // }

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
            await axios.post('http://localhost:5000/api/partners/', {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                status: formData.status,
                currentLoad: formData.currentLoad,
                areas: formData.areas,
                shift: formData.shift,
            });

            setSuccessMessage('Partner registration successful!');
            // Reset form data
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
        <div className='container mx-auto p-20'>
            <div className="partner-registration-form ">
            <h2 className="text-2xl font-bold mb-4">Partner Registration</h2>
            {successMessage && <p className="success-message text-green-500">{successMessage}</p>}
            {errors.submit && <p className="error text-red-500">{errors.submit}</p>}
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label className='block text-sm font-medium text-gray-700'>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.name && <p className="error text-red-500">{errors.name}</p>}
                </div>
                <div className='mb-4'>
                    <label className='block text-sm font-medium text-gray-700'>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.email && <p className="error text-red-500">{errors.email}</p>}
                </div>
                <div className='mb-4'>
                    <label className='block text-sm font-medium text-gray-700'>Phone:</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.phone && <p className="error text-red-500">{errors.phone}</p>}
                </div>
                <div className='mb-4'>
                    <label className='block text-sm font-medium text-gray-700'>Current Load (0-3):</label>
                    <input
                        type="number"
                        name="currentLoad"
                        value={formData.currentLoad}
                        onChange={handleChange}
                        min="0"
                        max="3"
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.currentLoad && <p className="error text-red-500">{errors.currentLoad}</p>}
                </div>
                <div className='mb-4'>
                    <label className='block text-sm font-medium text-gray-700'>Areas (comma-separated):</label>
                    <input
                        type="text"
                        name="areas"
                        value={formData.areas}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.areas && <p className="error text-red-500">{errors.areas}</p>}
                </div>
                <div className='mb-4'>
                    <label className='block text-sm font-medium text-gray-700'>Shift Start Time (HH:mm):</label>
                    <input
                        type="time"
                        name="shift.start"
                        value={formData.shift.start}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.shift && <p className="error text-red-500">{errors.shift}</p>}
                </div>
                <div className='mb-4'>
                    <label className='block text-sm font-medium text-gray-700'>Shift End Time (HH:mm):</label>
                    <input
                        type="time"
                        name="shift.end"
                        value={formData.shift.end}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.shift && <p className="error text-red-500">{errors.shift}</p>}
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                    Register
                </button>
            </form>
            
        </div>
        <div className='my-2'>
            <Link path={Partners} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded '>Back</Link>
            </div>
        </div>
    );
};

export default PartnerRegistrationForm;
                   