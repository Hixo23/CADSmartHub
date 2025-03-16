// src/pages/ApiDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';

const ApiDetail = ({ apis }) => {
    const { id } = useParams();
    const api = apis.find(api => api.id === parseInt(id));

    if (!api) {
        return <div>API not found</div>;
    }

    return (
        <div>
            <h2>{api.name}</h2>
            <p>{api.description}</p>
            <p>Endpoint: {api.endpoint}</p>
        </div>
    );
};

export default ApiDetail;
