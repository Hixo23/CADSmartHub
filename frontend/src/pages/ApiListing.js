// src/pages/ApiListing.js
import React from 'react';
import { Link } from 'react-router-dom';

const ApiListing = ({ apis }) => {
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
                                    <Link to={`/api/${api.id}`} className="btn btn-primary">View Details</Link>
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
