// src/pages/ProductDetail.js
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import '../styles/ProductDetails.css'; 

const ProductDetail = () => {
    const { name } = useParams(); // Get the product name from the URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null); // Create a ref for the file input
    const navigate = useNavigate(); // Hook to programmatically navigate

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/products/${name}`); // API endpoint
                if (Array.isArray(response.data) && response.data.length > 0) {
                    setProduct(response.data[0]); // Set the first product if it's an array
                } else {
                    setError('Product not found.');
                }
            } catch (error) {
                console.error('Error fetching product details:', error);
                setError('Failed to fetch product details.');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [name]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log(`Selected file: ${file.name}`);
            // You can call the upload function here if needed
        }
    };

    const handleBuyNow = () => {
        console.log(`Buying product with name: ${name} for price: ${product.price}`);
        // Navigate to the checkout page with the product name and price
        navigate(`/checkout/${name}`, { state: { name: product.name, price: product.price, type: product.type }});
    };

    // Function to capitalize the first letter of a string
    const capitalizeFirstLetter = (string) => {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    };


    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    if (!product) {
        return <div>No product found.</div>;
    }

    return (
        <div className="product-detail">
            <h1>{capitalizeFirstLetter(product.name)}</h1>
            <p>Type: {product.type}</p>
            <p>Description: {product.description}</p>            
            <p>Price: ${product.price}</p>
            <p>Monthly Subscription: {product.monthly_subscription}</p>
            <p>URL: <a href={product.url} target="_blank" rel="noopener noreferrer">{product.url}</a></p>
            <p>Max Files Allowed: {product.max_files}</p>

            {/* Hidden File Input */}
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }} // Hide the file input
                onChange={handleFileChange}
                accept=".zip,.csv,.json" // Accept specific file types
            />

            {/* Centered Buy Now Button */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>                
                <button onClick={handleBuyNow} className="buy-now-button" style={{ display: 'flex', alignItems: 'center' }}>
                    <FontAwesomeIcon icon={faShoppingCart} style={{ marginRight: '8px' }} />
                    Buy Now
                </button>
            </div>
        </div>
    );
};

export default ProductDetail;
