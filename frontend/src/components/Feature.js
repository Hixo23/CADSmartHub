// src/components/Features.js
import React from 'react';

const Features = () => {
    return (
        <div className="container my-5">
            <h2 className="text-center">Our Features</h2>
            <div className="row">
                <div className="col-md-4">
                    <div className="card mb-4">
                        <div className="card-body">
                            <h5 className="card-title">Feature 1</h5>
                            <p className="card-text">Description of feature 1.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card mb-4">
                        <div className="card-body">
                            <h5 className="card-title">Feature 2</h5>
                            <p className="card-text">Description of feature 2.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card mb-4">
                        <div className="card-body">
                            <h5 className="card-title">Feature 3</h5>
                            <p className="card-text">Description of feature 3.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Features;
