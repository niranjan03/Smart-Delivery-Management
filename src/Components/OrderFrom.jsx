// src/OrderForm.js
import React, { useState } from 'react';
import axios from 'axios';

const OrderForm = () => {
    const [orderNumber, setOrderNumber] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [customerAddress, setCustomerAddress] = useState('');
    const [area, setArea] = useState('');
    const [items, setItems] = useState([{ name: '', quantity: 1, price: 0 }]);
    const [scheduledFor, setScheduledFor] = useState('');
    const [totalAmount, setTotalAmount] = useState(0);

    const handleItemChange = (index, event) => {
        const newItems = [...items];
        newItems[index][event.target.name] = event.target.value;
        setItems(newItems);
    };

    const addItem = () => {
        setItems([...items, { name: '', quantity: 1, price: 0 }]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const orderData = {
            orderNumber,
            customer: {
                name: customerName,
                phone: customerPhone,
                address: customerAddress,
            },
            area,
            items,
            scheduledFor,
            totalAmount,
        };

        try {
            const response = await axios.post('http://localhost:5000/api/orders/', orderData);
            if (response.status === 200) {
                alert('Order submitted successfully!');
                // Optionally reset the form
                setOrderNumber('');
                setCustomerName('');
                setCustomerPhone('');
                setCustomerAddress('');
                setArea('');
                setItems([{ name: '', quantity: 1, price: 0 }]);
                setScheduledFor('');
                setTotalAmount(0);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error submitting order.');
        }
    };

    return (
        <form className="max-w-md mx-auto p-4 bg-white shadow-md rounded" onSubmit={handleSubmit}>
            <h2 className="text-xl font-bold mb-4">Create Order</h2>
            <input
                type="text"
                placeholder="Order Number"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                className="border rounded p-2 mb-4 w-full"
                required
            />
            <input
                type="text"
                placeholder="Customer Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="border rounded p-2 mb-4 w-full"
                required
            />
            <input
                type="text"
                placeholder="Customer Phone"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="border rounded p-2 mb-4 w-full"
                required
            />
            <input
                type="text"
                placeholder="Customer Address"
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                className="border rounded p-2 mb-4 w-full"
                required
            />
            <input
                type="text"
                placeholder="Area"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="border rounded p-2 mb-4 w-full"
                required
            />
            {items.map((item, index) => (
                <div key={index} className="flex mb-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Item Name"
                        value={item.name}
                        onChange={(e) => handleItemChange(index, e)}
                        className="border rounded p-2 w-full mr-2"
                        required
                    />
                    <input
                        type="number"
                        name="quantity"
                        placeholder="Quantity"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, e)}
                        className="border rounded p-2 w-full mr-2"
                        min="1"
                        required
                    />
                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={item.price}
                        onChange={(e) => handleItemChange(index, e)}
                        className="border rounded p-2 w-full mr-2"
                        min="0"
                        required
                    />
                </div>
            ))}
            <button type="button" onClick={addItem } className="bg-blue-500 text-white rounded p-2 mb-4">
                Add Item
            </button>
            <input
                type="text"
                placeholder="Scheduled For (YYYY-MM-DD)"
                value={scheduledFor}
                onChange={(e) => setScheduledFor(e.target.value)}
                className="border rounded p-2 mb-4 w-full"
                required
            />
            <button type="submit" className="bg-green-500 text-white rounded p-2">
                Submit Order
            </button>
        </form>
    );
};

export default OrderForm;