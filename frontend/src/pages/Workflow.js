// src/components/Workflow.js
import React from 'react';
import { FaCheckCircle } from 'react-icons/fa'; // Ensure this line is correct

const Workflow = () => {
    return (
        <div className="container my-5">
            <h2 className="text-center">Improve Your Workflow</h2>
            <p className="text-center mb-4">Discover how our APIs can streamline your processes and enhance productivity.</p>
            <div className="row">
                <div className="col-md-4 text-center">
                    <FaCheckCircle className="text-primary" size={50} />
                    <h5 className="mt-3">Automate tasks</h5>
                    <p>Reduce manual work by automating repetitive tasks with our powerful APIs.</p>
                </div>
                <div className="col-md-4 text-center">
                    <FaCheckCircle className="text-primary" size={50} />
                    <h5 className="mt-3">Integrate Seamlessly</h5>
                    <p>Integrate our APIs with your existing tools for a smooth workflow.</p>
                </div>
                <div className="col-md-4 text-center">
                    <FaCheckCircle className="text-primary" size={50} />
                    <h5 className="mt-3">Enhance Collaboration</h5>
                    <p>Work together with your team more effectively using our collaborative tools.</p>
                </div>
            </div>
        </div>
    );
};

export default Workflow;
