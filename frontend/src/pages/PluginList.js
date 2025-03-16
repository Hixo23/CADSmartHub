// frontend/src/pages/PluginsList.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/PluginsPage.css'; // Import the shared CSS file

const PluginsList = () => {
    const { type } = useParams(); // Get the category from the URL
    const [plugins, setPlugins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlugins = async () => {
           
            try {
                const response = await axios.get(`http://localhost:5000/api/plugins/${type}`);
                setPlugins(response.data);
            } catch (error) {
                console.error('Error fetching plugins:', error);
                setError('on Plugin List Failed to fetch plugins. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchPlugins();
    }, [type]);

    return (
        <div className="container">
            <h1>{category.charAt(0).toUpperCase() + category.slice(1)} Plugins</h1>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div className="error">{error}</div>
            ) : (
                <div className="plugin-grid">
                    {plugins.map(plugin => (
                        <div className="plugin-card" key={plugin.id}>
                            <h3>{plugin.name}</h3>
                            <h3>{plugin.type}</h3>
                            <p>{plugin.description}</p>
                            <p>Price: ${plugin.price}</p>
                            <Link to={`/plugins/${plugin.id}`} className="btn">View Details</Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PluginsList;
