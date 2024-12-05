import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPartnerById, updatePartner } from '../api/api'; // Assume these API functions exist

const EditPartner = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [partner, setPartner] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchPartner = async () => {
            try {
                const data = await getPartnerById(id);
                setPartner(data);
            } catch (err) {
                setError('Failed to fetch partner details.');
            } finally {
                setLoading(false);
            }
        };

        fetchPartner();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await updatePartner(id, partner); // Assume this function updates the partner
            setSuccessMessage('Partner updated successfully!');
            navigate('/partners'); // Redirect to the partners list after update
        } catch (err) {
            setError('Failed to update partner. Please try again.');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Edit Partner</h2>
            {successMessage && <p className="text-green-500">{successMessage}</p>}
            <form onSubmit={handleUpdate}>
                <div className="mb-4">
                    <label className="block text-gray-700">Name:</label>
                    <input
                        type="text"
                        value={partner.name}
                        onChange={(e) => setPartner({ ...partner, name: e.target.value })}
                        className="border border-gray-300 p-2 w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email:</label>
                    <input
                        type="email"
                        value={partner.email}
                        onChange={(e) => setPartner({ ...partner, email: e.target.value })}
                        className="border border-gray-300 p-2 w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Phone:</label>
                    <input
                        type="text"
                        value={partner.phone}
                        onChange={(e) => setPartner({ ...partner, phone: e.target.value })}
                        className="border border-gray-300 p-2 w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Area:</label>
                    <input
                        type="text"
                        value={partner.area?.name || ''}
                        onChange={(e) => setPartner({ ...partner, area: { name: e.target.value } })}
                        className="border border-gray-300 p-2 w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Shift Start:</label>
                    <input
                        type="text"
                        value={partner.shift?.start || ''}
                        onChange={(e) => setPartner({ ...partner, shift: { ...partner.shift, start: e.target.value } })}
                        className="border border-gray-300 p-2 w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Shift End:</label>
                    <input
                        type="text"
                        value={partner.shift?.end || ''}
                        onChange={(e) => setPartner({ ...partner, shift: { ...partner.shift, end: e.target.value } })}
                        className="border border-gray-300 p-2 w-full"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded"
                >
                    Update Partner
                </button>
            </form>
        </div>
    );
};

export default EditPartner;