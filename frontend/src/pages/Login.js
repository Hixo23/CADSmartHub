import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'; 

const Login = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            console.log('Logging in with:', { email, password }); // Log the credentials
            const response = await axios.post('http://localhost:5000/api/auth/login', { username: email, password });
            console.log('Login response:', response.data); // Log the response
            localStorage.setItem('token', response.data.token); // Store token in local storage
            setIsAuthenticated(true); // Update authentication state
            navigate('/api-listing'); // Redirect to home or another page
        } catch (err) {
            console.error('Login error:', err); // Log the error
            setError('Invalid email or password. Please try again.');
        }
    };

    const handleSignupRedirect = () => {
        navigate('/signup'); // Redirect to the signup page
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleLogin} className="login-form">
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        className="form-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        className="form-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="login-button">Login</button>
            </form>
            <div className="signup-option">
                <p>Don't have an account? <button onClick={handleSignupRedirect} className="signup-button">Sign Up</button></p>
            </div>
        </div>
    );
};

export default Login;
