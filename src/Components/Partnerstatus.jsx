import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Partnerstatus = () => {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/partners');
        setPartners(response.data);
      } catch (error) {
        console.error('Error fetching partners:', error);
      }
    };

    fetchPartners();
    // Consider using a WebSocket or polling mechanism for real-time updates
  }, []);

  return (
    <div className="container mx-auto p-4 absolute">
      <h2 className="text-2xl font-bold mb-4">Partner Availability</h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {partners.map(partner => (
            <tr key={partner._id} className="border-b border-gray-200">
              <td className="px-4 py-2">{partner.name}</td>
              <td className="px-4 py-2">
                <span className={`text-${partner.status === 'active' ? 'green' : 'red'}`}>{partner.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Partnerstatus;
