// src/pages/ApiListing.js
//import React, { useState, useEffect } from 'react';
//import { useParams, useNavigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
//import axios from 'axios';
//import { Link } from 'react-router-dom';



const ApiListing = ({ apis }) => {
    //const [plugins, setPlugins] = useState([]);
    const navigate = useNavigate(); 

    const handleToViewDetailsClick = (name) => {
        console.log('Navigating to product ID:', name); // Log the ID
        navigate(`/products/${name}`); //Navigate to ProductDetail page
    };

    return (
        <div className="container mt-5">
            <h2>API Listings</h2>
            <div className="row">
                {apis.length > 0 ? (
                    apis.map(api => (
                        <div className="col-md-4 mb-4" key={api.id}>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{api.name}</h5>
                                    <p className="card-text">{api.description}</p>                                    
                                    <button onClick={() => {
                                        //console.log('Clicked plugin name:); // Log the ID
                                        handleToViewDetailsClick(api.name);
                                    }} className="btn btn-primary">View Details</button>                                      
                            
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No APIs available.</p>
                )}
            </div>
        </div>
    );
};

export default ApiListing;
