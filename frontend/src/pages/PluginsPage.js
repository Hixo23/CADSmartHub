// frontend/src/pages/PluginsPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/PluginsPage.css'; // Import your CSS file

const PluginsPage = () => {
    const { type } = useParams(); // Get the type from the URL
    const [plugins, setPlugins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortOrder, setSortOrder] = useState('MOST_POPULAR');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const pluginsPerPage = 3; // Number of plugins per page
    const navigate = useNavigate(); // Hook to programmatically navigate

    useEffect(() => {
        const fetchPlugins = async () => {

            console.log("URL path : http://localhost:5000/api/plugins/"+type);
            try {
                const response = await axios.get(`http://localhost:5000/api/plugins/${type}`);
                setPlugins(response.data);
            } catch (error) {
                console.error('Error fetching plugins:', error);
                setError('Plugins page :Failed to fetch plugins. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchPlugins();
    }, [type]);

    // Filter and sort plugins
    const filteredPlugins = plugins.filter(plugin => 
        plugin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedPlugins = [...filteredPlugins].sort((a, b) => {
        if (sortOrder === 'MOST_POPULAR') {
            return b.id - a.id; // Example sorting logic
        }
        return 0; // Default case
    });

    // Pagination logic
    const indexOfLastPlugin = currentPage * pluginsPerPage;
    const indexOfFirstPlugin = indexOfLastPlugin - pluginsPerPage;
    const currentPlugins = sortedPlugins.slice(indexOfFirstPlugin, indexOfLastPlugin);
    const totalPages = Math.ceil(sortedPlugins.length / pluginsPerPage);

    const handleToProductClick = (name) => {
        console.log('Navigating to product ID:', name); // Log the ID
        navigate(`/products/${name}`); //Navigate to ProductDetail page
    };

    // Function to capitalize the first letter of a string
    const capitalizeFirstLetter = (string) => {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return (
        <div className="container">
            <div className="top-bar">
                <div className="sort-container">
                    <label>Sort by:</label>
                    <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                        <option value="MOST_POPULAR">Most Popular</option>
                        <option value="LEAST_POPULAR">Least Popular</option>
                        {/* Add more sorting options as needed */}
                    </select>
                </div>
                <input 
                    type="text" 
                    placeholder="Search for API..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                />
            </div>
            <div className="content">
                <div className="middle-part">
                    {loading ? (
                        <div>Loading...</div>
                    ) : error ? (
                        <div className="error">{error}</div>
                    ) : (
                        currentPlugins.map(plugin => (
                            <div className="plugin-card" key={plugin._id}>
                                <h3>{capitalizeFirstLetter(plugin.name)}</h3>                                
                                <p>{plugin.description}</p>
                                <p>Type: {plugin.type}</p>
                                <p>Price: ${plugin.price}</p>                                
                                <button onClick={() => {
                                        console.log('Clicked plugin name:', plugin.name); // Log the ID
                                        handleToProductClick(plugin.name);
                                    }} className="plugin-btn">To Product</button>
                                      
                            </div>                            
                        ))
                    )}
                </div>
                
            </div>
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button 
                        key={index} 
                        onClick={() => setCurrentPage(index + 1)} 
                        className={currentPage === index + 1 ? 'active' : ''}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default PluginsPage;
