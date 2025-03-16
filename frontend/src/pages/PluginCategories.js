// frontend/src/pages/PluginCategories.js

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/PluginsPage.css'; 

const PluginCategories = () => {
    return (
        <div className="container my-5">
            <h2 className="text-center">CAD API Services</h2>
            <p className="text-center mb-3">Explore our range of software solutions tailored for AEC and CAD professionals.</p>
            <div className="row">
                
                <div className="col-md-4 text-center highlighted-text mb-3">
                    <Link to="/plugins/2DCAD" className="text-decoration-none">
                        <h5 className="text-primary cursor-pointer">2D Drawing API Services</h5>
                        <p>Plugins tailored for drawing and annotation.</p>
                    </Link>
                </div>               
                <div className="col-md-3 text-center highlighted-text mb-3">
                    <Link to="/plugins/DataConversion" className="text-decoration-none">
                        <h5 className="text-primary cursor-pointer">Data Conversion Services</h5>
                        <p>Plugins available for data or file format conversion .</p>
                    </Link>
                </div>
                <div className="col-md-4 text-center highlighted-text mb-3">
                    <Link to="/plugins/Automation" className="text-decoration-none">
                        <h5 className="text-primary cursor-pointer">Automation & CAD API Services</h5>
                        <p>Plugins designed for building automation and CAD services.</p>
                    </Link>
                </div>
                {/* <div className="col-md-3 col-sm-6 text-center highlighted-text mb-4">
                    <Link to="/plugins/Civil" className="text-decoration-none">
                        <h5 className="text-primary cursor-pointer">AEC Services</h5>
                        <p>Plugins focused on Architecture, Engineering and Construction.</p>
                    </Link>
                </div> */}
            </div>
        </div>
    );
};

export default PluginCategories;
