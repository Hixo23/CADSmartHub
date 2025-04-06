// frontend/src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import SwaggerDocs from './components/SwaggerDocs';
import ApiListing from './pages/ApiListing';
import ApiDetail from './pages/ApiDetail';
import FeaturesSection from './components/FeaturesSection';
import Hero from './components/Hero';
import NotFound from './pages/NotFound';
import PluginCategories from './pages/PluginCategories';
import PluginsPage from './pages/PluginsPage';
import ProductDetail from './pages/ProductDetail';
import Checkout from "./pages/Checkout"
import Signup from './pages/Signup';
import Login from './pages/Login';
import MiddlewareAPIServices from './pages/MiddlewareAPIServices'
import About from './pages/About';
import Contact from './pages/Contact';
import axios from 'axios';


function App() {
    const [apis, setApis] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token')); // Check if user is authenticated

    useEffect(() => {
        const fetchApis = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/apis');
                setApis(response.data);
            } catch (error) {
                console.error('Error fetching APIs:', error);
                setError('Failed to fetch APIs. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchApis();
    }, []);

    return (
        <Router>
            <Header isAuthenticated={isAuthenticated} />
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div className="error">{error}</div>
            ) : (
                <Routes>
                    <Route path="/" element={<><Hero /><FeaturesSection /></>} />
                    <Route path="/api-listing" element={<ApiListing apis={apis} />} />
                    <Route path="/api/:id" element={<ApiDetail apis={apis} />} />
                    <Route path="/plugins" element={<PluginCategories />} />
                    <Route path="/plugins/:type" element={<PluginsPage />} />
                    <Route path="/plugins/:_id" element={<ProductDetail />} />
                    <Route path="/products/:name" element={<ProductDetail />} />
                    <Route path="/checkout/:name" element={<Checkout />} />                    
                    <Route path="/middlewareAPIServices" element={<MiddlewareAPIServices />} />/                    
                    <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/api-docs" element={<SwaggerDocs />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            )}
            <Footer />
        </Router>
    );
}

export default App;
