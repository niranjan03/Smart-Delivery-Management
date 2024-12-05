import React, { useState } from 'react';
import axios from 'axios';

const PartnerStatusToggle = ({ partnerId }) => {
    const [onlineStatus, setOnlineStatus] = useState('offline'); // Initial state

    const toggleStatus = async () => {
        const newStatus = onlineStatus === 'online' ? 'offline' : 'online';
        try {
            const response = await axios.patch(`http://localhost:5000/api/partners/${partnerId}/online-status`, {
                onlineStatus: newStatus,
            });
            setOnlineStatus(newStatus); // Update local state
            alert(response.data.message);
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Failed to update status');
        }
    };

    return (
        <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Current Status:</h3>
            <span className={`text-xl font-bold ${onlineStatus === 'online' ? 'text-green-500' : 'text-red-500'}`}>
                {onlineStatus.charAt(0).toUpperCase() + onlineStatus.slice(1)}
            </span>
            <button
                onClick={toggleStatus}
                className={`mt-4 px-4 py-2 rounded-lg focus:outline-none transition duration-300 ${
                    onlineStatus === 'online' ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
            >
                Set as {onlineStatus === 'online' ? 'Offline' : 'Online'}
            </button>
        </div>
    );
};

export default PartnerStatusToggle;