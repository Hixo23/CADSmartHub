// src/components/FeaturesSection.js
import React from 'react';
import Workflow from '../pages/Workflow';
//
import PluginCategories from '../pages/PluginCategories';

const FeaturesSection = () => {
    return (
        <div>
            <Workflow />          
            <PluginCategories />
        </div>
    );
};

export default FeaturesSection;
