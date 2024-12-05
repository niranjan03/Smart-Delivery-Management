// components/ShiftScheduling.jsx
import React, { useEffect, useState } from 'react';
import { getPartners, createShift } from '../api/api';

const ShiftScheduling = () => {
    const [partners, setPartners] = useState([]);
    const [selectedPartner, setSelectedPartner] = useState('');
    const [shiftDate, setShiftDate] = useState('');
    const [shiftTime, setShiftTime] = useState('');

    useEffect(() => {
        const fetchPartners = async () => {
            const data = await getPartners();
            setPartners(data);
        };
        fetchPartners();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const shiftData = { partnerId: selectedPartner, date: shiftDate, time: shiftTime };
        const response = await createShift(shiftData);
        console.log('Shift scheduled:', response);
        // Optionally reset form or display success message
        setSelectedPartner('');
        setShiftDate('');
        setShiftTime('');
    };

    return (
        <div className="bg-white p-4 rounded shadow-md mb-4">
            <h2 className="text-xl font-bold mb-2">Shift Scheduling</h2>
            <form onSubmit={handleSubmit} className="mb-4">
                <select
                    value={selectedPartner}
                    onChange={(e) => setSelectedPartner(e.target.value)}
                    required
                    className="block mb-2 border rounded p-2"
                >
                    <option value="">Select Partner</option>
                    {partners.map((partner) => (
                        <option key={partner._id} value={partner._id}>
                            {partner.name}
                        </option>
                    ))}
                </select>
                <input
                    type="date"
                    value={shiftDate}
                    onChange={(e) => setShiftDate(e.target.value)}
                    required
                    className="block mb-2 border rounded p-2"
                />
                <input
                    type="text"
                    placeholder="Shift Time (e.g., 09:00 AM - 05:00 PM)"
                    value={shiftTime}
                    onChange={(e) => setShiftTime(e.target.value)}
                    required
                    className="block mb-2 border rounded p-2"
                />
                <button type="submit" className="bg-blue-500 text-white rounded p-2">Schedule Shift</button>
            </form>
        </div>
    );
};

export default ShiftScheduling;