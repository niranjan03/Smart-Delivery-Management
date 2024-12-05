import React, { useEffect, useState } from 'react';
import { getPartners, deletePartner } from '../api/api';
import Notification from './Notification';
import LoadingSpinner from './LoadingSpinner';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const PartnerList = () => {
    const [partners, setPartners] = useState([]);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const fetchPartners = async () => {
            try {
                const data = await getPartners();
                setPartners(data);
            } catch (err) {
                setError('Failed to fetch partners. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchPartners();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deletePartner(id);
            setPartners(partners.filter(partner => partner._id !== id));
            setSuccessMessage('Partner deleted successfully!');
        } catch (err) {
            setError('Failed to delete partner. Please try again.');
        }
    };

    const handleEdit = (id) => {
        // Navigate to the edit page for the selected partner
        navigate(`/edit-partner/${id}`); // Adjust the route as needed
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!Array.isArray(partners)) {
        return <p>Error: Partners data is not available.</p>;
    }

    return (
        <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Partner List</h2>
            {successMessage && <Notification message={successMessage} type="success" />}
            {error && <Notification message={error} type="error" />}
            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 p-2">Name</th>
                        <th className="border border-gray-300 p-2">Email</th>
                        <th className="border border-gray-300 p-2">Phone</th>
                        <th className="border border-gray-300 p-2">Area</th>
                        <th className="border border-gray-300 p-2">Shift</th>
                        <th className="border border-gray-300 p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {partners.length > 0 ? (
                        partners.map((partner) => {
                            if (!partner || !partner._id) {
                                console.error("Invalid partner object:", partner);
                                return null; // Skip rendering this row
                            }

                            return (
                                <tr key={partner._id}>
                                    <td className="border border-gray-300 p-2">{partner.name || 'N/A'}</td>
                                    <td className="border border-gray-300 p-2">{partner.email || 'N/A'}</td>
                                    <td className="border border-gray-300 p-2">{partner.phone || 'N/A'}</td>
                                    <td className="border border-gray-300 p-2">{partner.area?.name || 'N/A'}</td>
                                    <td className="border border-gray-300 p-2">
                                        {partner.shift ? `${partner.shift.start} - ${partner.shift.end}` : 'N/A'}
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        <button
                                            onClick={() => handleEdit(partner._id)}
                                            className="bg-blue-500 text-white p-1 rounded mr-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(partner._id)}
                                            className="bg-red-500 text-white p-1 rounded"
                                        >
                                            Delete
                                        </button>
                                        </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan="6" className="border border-gray-300 p-2 text-center">
                                No partners found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default PartnerList;