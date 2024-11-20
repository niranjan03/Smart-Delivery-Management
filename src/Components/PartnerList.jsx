// src/components/PartnerList.js
import React from 'react';
import axios from 'axios';

const PartnerList = ({ partners, fetchPartners, setPartnerToEdit }) => {
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this partner?")) {
            await axios.delete(`/api/partners/${id}`);
            fetchPartners(); // Refresh the partner list after deletion
        }
    };

    return (
        <div>
            <h2>Partner List</h2>
            {partners.length === 0 ? (
                <p>No partners found.</p>
            ) : (
                <ul>
                    {partners.map((partner) => (
                        <li key={partner._id}>
                            <h3>Partner ID: {partner._id}</h3>
                            <p><strong>Name:</strong> {partner.name}</p>
                            <p><strong>Email:</strong> {partner.email}</p>
                            <p><strong>Phone:</strong> {partner.phone}</p>
                            <p><strong>Address:</strong> {partner.address}</p>
                            <button onClick={() => setPartnerToEdit(partner)}>Edit</button>
                            <button onClick={() => handleDelete(partner._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PartnerList;