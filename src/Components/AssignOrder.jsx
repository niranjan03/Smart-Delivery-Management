// src/AssignOrder.js
import React, { useState } from 'react';
import axios from 'axios';

const AssignOrder = () => {
    const [orderId, setOrderId] = useState('');
    const [partnerId, setPartnerId] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(`/api/orders/${orderId}/assign`, {
                orderId,
                partnerId,
            });

            setResponseMessage(`Order assigned: ${JSON.stringify(response.data)}`);
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                setResponseMessage(`Error: ${error.response.data.message}`);
            } else {
                // Something happened in setting up the request that triggered an Error
                setResponseMessage(`Error: ${error.message}`);
            }
        }
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Assign Order to Delivery Partner</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="orderId" className="block text-sm font-medium text-gray-700">Order ID:</label>
                    <input
                        type="text"
                        id="orderId"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label htmlFor="partnerId" className="block text-sm font-medium text-gray-700">Delivery Partner ID:</label>
                    <input
                        type="text"
                        id="partnerId"
                        value={partnerId}
                        onChange={(e) => setPartnerId(e.target.value)}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
                >
                    Assign Order
                </button>
            </form>
            {responseMessage && (
                <div className="mt-4 p-2 border border-gray-300 rounded-md">
                    {responseMessage}
                </div>
            )}
        </div>
    );
};

export default AssignOrder;