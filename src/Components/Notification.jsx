// components/Notification.jsx

import React from 'react';

const Notification = ({ message, type }) => {
    return (
        <div className={`p-4 rounded mb-4 ${type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message}
        </div>
    );
};

export default Notification;