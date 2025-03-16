// frontend/src/pages/Checkout.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useLocation
import axios from 'axios';
import '../styles/Checkout.css';

const Checkout = () => {
    const location = useLocation(); // Get the location object
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });

    const [price, setPrice] = useState(0); // State to hold the price
    const [isSuccess, setIsSuccess] = useState(false); // State for checkout success

    useEffect(() => {
        // Assuming the price is passed via location state
        if (location.state && location.state.price) {
            setPrice(location.state.price);
        }
    }, [location.state]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/checkout', { ...formData, price });
            console.log('Checkout successful:', response.data);
            
            // Set success state
            setIsSuccess(true);

            // Navigate to MiddlewareAPIServices with the name as the service

            console.log('/middlewareAPIServices/selectedServiceType : ', location.state.type);
            navigate('/middlewareAPIServices', { 
                state: { 
                    selectedService: location.state.name, 
                    selectedServiceType: location.state.type 
                } 
            });

        } catch (error) {
            console.error('Error during checkout:', error);
        }
    };

    return (
        <div className="checkout">
            <h1>Checkout</h1>
            {isSuccess ? (
                <p className="success-message">Purchase successful! Response will be provided over email in very short time.</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name:</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Address:</label>
                        <input type="text" name="address" value={formData.address} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Card Number:</label>
                        <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Expiry Date:</label>
                        <input type="text" name="expiryDate" value={formData.expiryDate} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>CVV:</label>
                        <input type="text" name="cvv" value={formData.cvv} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Price:</label>
                        <input type="text" value={`$${price.toFixed(2)}`} readOnly /> {/* Non-modifiable price field */}
                    </div>
                    <button type="submit" className="checkout-button">Complete Purchase</button>
                </form>
            )}
        </div>
    );
};

export default Checkout;
