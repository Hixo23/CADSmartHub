// src/components/Hero.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = ({ isAuthenticated }) => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        if (isAuthenticated) {
            // If the user is authenticated, navigate to the API listing page
            navigate('/api-listing');
        } else {
            // If the user is not authenticated, navigate to the Login page
            navigate('/login');
        }
    };

    return (
        <div className="hero bg-primary text-white text-center py-5">
            <div className="container">
                <h1 className="display-4">Welcome to CAD Smart Hub</h1>
                <p className="lead highlight-text">Discover and connect with various APIs.</p>
                <button onClick={handleGetStarted} className="btn btn-light btn-lg">Get Started</button>
            </div>
        </div>
    );
};

export default Hero;
