// components/AreaManagement.jsx

import React, { useEffect, useState } from 'react';
import { getAreas, createArea } from '../api/api';

const AreaManagement = () => {
    const [areas, setAreas] = useState([]);
    const [newArea, setNewArea] = useState('');

    useEffect(() => {
        const fetchAreas = async () => {
            const data = await getAreas();
            setAreas(data);
        };
        fetchAreas();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await createArea({ name: newArea });
        setAreas([...areas, response]);
        setNewArea('');
    };

    return (
        <div className="bg-white p-4 rounded shadow-md mb-4">
            <h2 className="text-xl font-bold mb-2">Area Management</h2>
            <form onSubmit={handleSubmit} className="mb-4">
                <input
                    type="text"
                    placeholder="New Area"
                    value={newArea}
                    onChange={(e) => setNewArea(e.target.value)}
                    required
                    className="block mb-2 border rounded p-2"
                />
                <button type="submit" className="bg-blue-500 text-white rounded p-2">Add Area</button>
            </form>
            <ul className="space-y-2">
                {areas.map((area) => (
                    <li key={area._id} className="border p-2 rounded">
                        {area.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default AreaManagement;