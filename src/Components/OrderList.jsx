import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleAssignOrder = async (orderId, partnerId) => {
    try {
      await axios.post(`http://localhost:5000/api/orders/${orderId}/assign`, { partnerId });
      // Update the local state to reflect the change
      const updatedOrders = orders.map(order => {
        if (order._id === orderId) {
          return { ...order, assignedTo: partnerId };
        }
        return order;
      });
      setOrders(updatedOrders);
    } catch (error) {
      console.error('Error assigning order:', error);
      // Handle error, e.g., display an error message to the user
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Order List</h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Order ID</th>
            <th className="px-4 py-2">Customer Name</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id} className="border-b border-gray-200">
              <td className="px-4 py-2">{order.orderNumber}</td>
              <td className="px-4 py-2">{order.customer.name}</td>
              <td className="px-4 py-2">{order.status}</td>
              <td className="px-4 py-2">
                <button onClick={() => handleAssignOrder(order._id, 'partnerId')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Assign</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;