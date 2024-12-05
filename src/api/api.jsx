// src/api/api.js

import axios from 'axios';

// Set up the base URL for your API
const API_URL = 'https://smart-delivery-management-3gdr.onrender.com/api'; // Adjust based on your backend server

// Partner API

// Create a new partner
// export const createPartner = async (partnerData) => {
//     try {
//         const response = await axios.post(`${API_URL}/partners`, partnerData);
//         return response.data;
//     } catch (error) {
//         throw error.response ? error.response.data : error.message;
//     }
// };

// Get all partners
export const getPartners = async () => {
    try {
        const response = await axios.get(`${API_URL}/partners`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

// // Get a partner by ID
export const getPartnerById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/partners/${id}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

// Update a partner
export const updatePartner = async (id, partnerData) => {
    try {
        const response = await axios.put(`${API_URL}/partners/${id}`, partnerData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

// Delete a partner
export const deletePartner = async (id) => {
    try {
        await axios.delete(`${API_URL}/partners/${id}`);
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

// // Area API

// // Create a new area
// export const createArea = async (areaData) => {
//     try {
//         const response = await axios.post(`${API_URL}/areas`, areaData);
//         return response.data;
//     } catch (error) {
//         throw error.response ? error.response.data : error.message;
//     }
// };

// // Get all areas
// export const getAreas = async () => {
//     try {
//         const response = await axios.get(`${API_URL}/areas`);
//         return response.data;
//     } catch (error) {
//         throw error.response ? error.response.data : error.message;
//     }
// };

// // Shift API

// // Create a new shift
// export const createShift = async (shiftData) => {
//     try {
//         const response = await axios.post(`${API_URL}/shifts`, shiftData);
//         return response.data;
//     } catch (error) {
//         throw error.response ? error.response.data : error.message;
//     }
// };

// // Get shift history by partner ID
// export const getShiftHistory = async (partnerId) => {
//     try {
//         const response = await axios.get(`${API_URL}/shifts/${partnerId}`);
//         return response.data;
//     } catch (error) {
//         throw error.response ? error.response.data : error.message;
//     }
// };