// frontend/src/pages/MiddlewareAPIServices.js
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import '../styles/APIServices.css'; 

const MiddlewareAPIServices = () => {
    const location = useLocation();    
    const { selectedService, selectedServiceType } = location.state; // Get the selected service from the state     
    const [file, setFile] = useState(null);
    const [fastenerData, setFastenerData] = useState({
        standard: '',
        type: '',
        size: '',
        headOption: '',
        fastenerLength: 0.125,
        materialThickness: 1,
    });
    const [layerData, setLayerData] = useState({
        action: '',
        layerDescription: '',
    });

    const [isDisabled, setIsDisabled] = useState(true);
    const [message, setMessage] = useState('');

    // Function to enable the Download button
    const enableDownloadButton = () => {
        setIsDisabled(false);
        setMessage('File uploaded successfully! You can now download it soon...');
    };
    const disableDownloadButton = () => {
        setIsDisabled(true);
        setMessage('');
    };
    
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleFastenerChange = (e) => {
        const { name, value } = e.target;
        setFastenerData({ ...fastenerData, [name]: value });
    };

    const handleLayerChange = (e) => {
        const { name, value } = e.target;
        setLayerData({ ...layerData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('type', selectedServiceType);
        formData.append('apiName', selectedService);
        formData.append('file', file);
    
        console.log('selectedServiceType : ', selectedServiceType);
        console.log('selectedService name : ', selectedService);
        console.log('file', file);
    
        // Launch CAD in the background
       

        try {
                const response = await axios.post('http://localhost:5000/api/launch-cad');            
                console.log('Response from middleware:', response.data);
                if (response.status >= 200 && response.status < 300) {
                    enableDownloadButton();
                }
            } catch (error) {
                // Enhanced error loading            
                console.error('Error message:', error.message);
                setMessage('Error uploading file. Please try again.');                 
            }    
    
        try {
            const response = await axios.post('http://localhost:5000/api/invoke-services', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log('Response from middleware (invoke-services):', response.data);
            if(response)
            // Handle the response as needed
            if (response.status >= 200 && response.status < 300) {
                enableDownloadButton();
            }
        } catch (error) {
            // Enhanced error logging
            console.error('Error submitting data:', error); // Log the entire error object
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Status code:', error.response.status);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
            setMessage('Error invoke-services. Please try again.'); 
        }
    };
    
    const handleDownload = () => {
       
        //File present in path = ../../../backend/downloads
        //Full path = "../../../backend/downloads + file.filename_without_extention + .DWG";
        // Provide the code to download or copy file from here to your download folder or through URL
        // Get the filename without extension
        const filenameWithoutExtension = file.name.split('.').slice(0, -1).join('.'); // Get the name without extension
        const filename = `${filenameWithoutExtension}.DWG`; // Construct the DWG filename

        if (!filename) {
            console.error('No file available for download.');
            return;
        }

        // Construct the download URL
        const downloadUrl = `http://localhost:5000/downloads/${filename}`; // Adjust the URL as necessary

        // Open the download URL in a new tab
        window.open(downloadUrl, '_blank');
        disableDownloadButton();
    };
    
    return (
        <div className="middleware-api-services"> {/* Added class here */}
            <h1>{selectedService} API Service</h1>
            <div className="form-header">
                <p>Max 50 Files Allowed</p>
                <p>Upload correct file format, single file or multiple files with zip folder</p>
            </div>
            <form onSubmit={handleSubmit}>
                {selectedService === 'smartDim' && (
                    <div className="form-group">
                        <label>Upload DWG File:</label>
                        <input type="file" onChange={handleFileChange} required />
                    </div>
                )}

                {selectedService === 'createFastner' && (
                    <div>
                        <div className="form-group">
                            <label>Standard:</label>
                            <select name="standard" onChange={handleFastenerChange} required>
                                <option value="">--Select--</option>
                                <option value="ANSI Inch">ANSI Inch</option>
                                <option value="ANSI Metric">ANSI Metric</option>
                                <option value="BSI">BSI</option>
                                <option value="DIN">DIN</option>
                                <option value="SIO">SIO</option>
                                <option value="JIS">JIS</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Type:</label>
                            <select name="type" onChange={handleFastenerChange} required>
                                <option value="">--Select--</option>
                                <option value="Binding">Binding</option>
                                <option value="Button">Button</option>
                                <option value="Fillister">Fillister</option>
                                <option value="Flat Head">Flat Head</option>
                                <option value="Hex bolt">Hex bolt</option>
                                <option value="Hex Screw">Hex Screw</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Size:</label>
                            <select name="size" onChange={handleFastenerChange} required>
                                <option value="">--Select--</option>
                                <option value="80">80</option>
                                <option value="56">56</option>
                                <option value="40">40</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Head Options:</label>
                            <select name="headOption" onChange={handleFastenerChange} required>
                                <option value="">--Select--</option>
                                <option value="Cross">Cross</option>
                                <option value="Slot">Slot</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Fastener Length:</label>
                            <select name="fastenerLength" onChange={handleFastenerChange} required>
                                <option value="0.125">0.125</option>
                                <option value="0.25">0.25</option>
                                <option value="0.375">0.375</option>
                                <option value="0.5">0.5</option>
                                <option value="0.625">0.625</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Material Thickness:</label>
                            <input
                                type="number"
                                name="materialThickness"
                                value={fastenerData.materialThickness}
                                onChange={handleFastenerChange}
                                required
                            />
                        </div>                       
                    </div>
                )}

                {selectedService === 'cleanDrawing' && (
                    <div className="form-group">
                        <label>Upload DWG File:</label>
                        <input type="file" onChange={handleFileChange} required />
                    </div>
                )}

                {selectedService === 'modifyLayer' && (
                    <div>
                        <div className="form-group">
                            <label>Action:</label>
                            <select name="action" onChange={handleLayerChange} required>
                                <option value="">--Select--</option>
                                <option value="Add">Add</option>
                                <option value="Remove">Remove</option>
                                <option value="Read">Read</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Layer Number / Description:</label>
                            <input
                                type="text"
                                name="layerDescription"
                                value={layerData.layerDescription}
                                onChange={handleLayerChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Upload DWG File:</label>
                            <input type="file" onChange={handleFileChange} required />
                        </div>
                    </div>
                )}
               
                {['pdfToDWG', 'svgToDWG', 'dgnToDWG', 'CATDrawingToDWG', 'stepToDWG', 'generateGcode', 'extractBOM', 'drawCompare', 'batchPrint', 'batchExport'].includes(selectedService) && (
                    <div className="form-group">
                        <label>Upload File:</label>
                        <input 
                            type="file" 
                            onChange={handleFileChange} 
                            required 
                            accept={
                                selectedService === 'pdfToDWG' ? '.pdf, .zip' :
                                selectedService === 'svgToDWG' ? '.svg, .zip' :
                                selectedService === 'dgnToDWG' ? '.dgn, .zip' :
                                selectedService === 'CATDrawingToDWG' ? '.CATDrawing, .zip' :
                                selectedService === 'stepToDWG' ? '.STEP, .zip' :
                                selectedService === 'generateGcode' ? '.dwg, .zip' :
                                selectedService === 'extractBOM' ? '.dwg, .zip' :
                                selectedService === 'drawCompare' ? '.zip' : // zip of 2 dwg files
                                selectedService === 'batchPrint' ? '.zip' : // zip of dwg files
                                selectedService === 'batchExport' ? '.zip' : // zip of dwg files
                                ''
                            }
                        />
                    </div>
                )}

                <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                    <button type="submit" onClick={handleSubmit}>Upload</button>
                    <button type="button" disabled={isDisabled} onClick={handleDownload}>Download</button>                    
                </div>
                {/* Message display */}
                {message && <p style={{ textAlign: 'center', marginTop: '10px', color: isDisabled ? 'red' : 'green' }}>{message}</p>}
            </form>
        </div>
    );
};

export default MiddlewareAPIServices;
