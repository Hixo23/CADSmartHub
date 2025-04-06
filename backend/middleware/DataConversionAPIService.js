// middleware/DataConversionAPIService.js
const axios = require('axios');
const { exec } = require('child_process');
const path = require('path');
const s3Handler = require('./s3Handler');
// Import your C++ addon if needed
// const addon = require('./build/Release/myaddon'); // Adjust the path to your compiled addon

// Define the wrapper functions for each operation
async function pdfToDWG(data) {
    try {
        const result = await convertPDFToDWG(data); // Replace with actual conversion logic
        return { message: 'PDF converted to DWG successfully', result };
    } catch (error) {
        console.error('Error in pdfToDWG operation:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
}

async function svgToDWG(data) {
    try {
        const result = await convertSVGToDWG(data); // Replace with actual conversion logic
        return { message: 'SVG converted to DWG successfully', result };
    } catch (error) {
        console.error('Error in svgToDWG operation:', error);
        throw error;
    }
}

async function dgnToDWG(data) {
    try {
        const result = await convertDGNToDWG(data); // Replace with actual conversion logic
        return { message: 'DGN converted to DWG successfully', result };
    } catch (error) {
        console.error('Error in dgnToDWG operation:', error);
        throw error;
    }
}

async function CATDrawingToDWG(data) {
    try {
        const result = await convertCATDrawingToDWG(data); // Replace with actual conversion logic
        return { message: 'CATDrawing converted to DWG successfully', result };
    } catch (error) {
        console.error('Error in CATDrawingToDWG operation:', error);
        throw error;
    }
}

async function stepToDWG(data) {
    try {
        const result = await convertStepToDWG(data); // Replace with actual conversion logic
        return { message: 'STEP converted to DWG successfully', result };
    } catch (error) {
        console.error('Error in stepToDWG operation:', error);
        throw error;
    }
}

// Define a mapping of operations to their respective API wrapper functions
const apiOperations = {     
    'pdfToDWG': pdfToDWG,
    'svgToDWG': svgToDWG,
    'dgnToDWG': dgnToDWG,
    'CATDrawingToDWG': CATDrawingToDWG,
    'stepToDWG': stepToDWG       
};

// New function to process the file based on the API name
async function convert(file, apiName) {
    if (!apiOperations[apiName]) {
        throw new Error(`API operation "${apiName}" is not defined.`);
    }

    try {
        // Call the appropriate operation based on the apiName
        const result = await apiOperations[apiName](file);
        return result;
    } catch (error) {
        console.error(`Error processing file with API "${apiName}":`, error);
        throw error; // Rethrow the error for handling in the calling function
    }
}

// Export the apiOperations object and the convert function for use in other parts of the application
module.exports = {
    apiOperations,
    convert
};

// Example conversion functions (replace these with actual implementations)
// Path to the batch fil

async function runBatch(batchFilePath,data)
{
     // Construct the uploads and downloads directory paths relative to the current working directory
    const uploadsDir = path.join(__dirname, '../Data/uploads'); // Path to uploads directory
    const downloadsDir = path.join(__dirname, '../Data/downloads'); // Path to downloads directory

    // Construct input and output file paths
    const inputFilePath = path.join(uploadsDir, data.filename); // Path to the input PDF file
    //console.log('inputFilePath :', inputFilePath);
    // Get the filename without extension
    const extension = path.extname(data.filename);
    const filenameWithoutExtension = path.basename(data.filename, extension); 
    // Construct output file path
    const outputFilePath = path.join(downloadsDir, `${filenameWithoutExtension}.DWG`); // Path to the output DWG file

    //console.log('outputFilePath :', outputFilePath);

    // Construct the command to execute the batch file with arguments
    const command = `"${batchFilePath}" "${inputFilePath}" "${outputFilePath}"`;

    console.log('command:', command);

    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing batch file: ${error.message}`);
                return reject(error);
            }
            if (stderr) {
                console.error(`Batch file error: ${stderr}`);
                return reject(new Error(stderr));
            }
            console.log(`Batch file output: ${stdout}`);
            resolve({ message: 'Conversion completed successfully', output: stdout });
        });
    });

}

async function convertPDFToDWG(data) {
    
    const batchFilePath = path.join(__dirname, '../Data/Scripts/PDF_To_DWG/run_draftsight_script.bat');
    let result;   
   // Run batch file and await the result
   try {
        
        result = await runBatch(batchFilePath, data);    

        //const result = await runBatchAWS(batchFilePath,data);
        //return result; // Return the result of the conversion
    } catch (error) {
        console.error('Error in convertPDFToDWG:', error);
        throw error; // Rethrow the error for handling in the calling function
    }

    try {
        
        await s3Handler.uploadFiletoS3Upload(data);
        await s3Handler.uploadFiletoS3Download(data); 

        //const result = await runBatchAWS(batchFilePath,data);
        // Return the result of the conversion
    } catch (error) {
        console.error('Error in uploading files to AWS', error);
        throw error; // Rethrow the error for handling in the calling function
    }

    return result;
}

async function convertSVGToDWG(data) {    
    const batchFilePath = path.join(__dirname, '../Data/Scripts/SVG_To_DWG/run_draftsight_script.bat'); 
    let result; 
    try {
        const result = await runBatch(batchFilePath, data);
        //return result; // Return the result of the conversion
    } catch (error) {
        console.error('Error in convertSVGToDWG:', error);
        throw error; // Rethrow the error for handling in the calling function
    }

    try {
        
        await s3Handler.uploadFiletoS3Upload(data);
        await s3Handler.uploadFiletoS3Download(data); 

        //const result = await runBatchAWS(batchFilePath,data);
        // Return the result of the conversion
    } catch (error) {
        console.error('Error in uploading files to AWS', error);
        throw error; // Rethrow the error for handling in the calling function
    }

    return result;
    
}

async function convertDGNToDWG(data) {
   
    const batchFilePath = path.join(__dirname, '../Data/Scripts/DGN_TO_DWG/run_draftsight_script.bat');  
    let result; 
    try {
        const result = await runBatch(batchFilePath, data);
        //return result; // Return the result of the conversion
    } catch (error) {
        console.error('Error in convertSVGToDWG:', error);
        throw error; // Rethrow the error for handling in the calling function
    }

    try {
        
        await s3Handler.uploadFiletoS3Upload(data);
        await s3Handler.uploadFiletoS3Download(data); 

        //const result = await runBatchAWS(batchFilePath,data);
        // Return the result of the conversion
    } catch (error) {
        console.error('Error in uploading files to AWS', error);
        throw error; // Rethrow the error for handling in the calling function
    }

    return result;
}

async function convertCATDrawingToDWG(data) {
    
    const batchFilePath = path.join(__dirname, '../Data/Scripts/CATDrawing_To_DWG/run_draftsight_script.bat');
    // run batch file
    let result; 
    try {
        const result = await runBatch(batchFilePath, data);
        //return result; // Return the result of the conversion
    } catch (error) {
        console.error('Error in convertSVGToDWG:', error);
        throw error; // Rethrow the error for handling in the calling function
    }

    try {
        
        await s3Handler.uploadFiletoS3Upload(data);
        await s3Handler.uploadFiletoS3Download(data); 

        //const result = await runBatchAWS(batchFilePath,data);
        // Return the result of the conversion
    } catch (error) {
        console.error('Error in uploading files to AWS', error);
        throw error; // Rethrow the error for handling in the calling function
    }

    return result;
}

async function convertStepToDWG(data) {
    
    const batchFilePath = path.join(__dirname, '../Data/Scripts/STEP_To_DWG/run_draftsight_script.bat'); 
    // run batch file   
    let result; 
    try {
        const result = await runBatch(batchFilePath, data);
        //return result; // Return the result of the conversion
    } catch (error) {
        console.error('Error in convertSVGToDWG:', error);
        throw error; // Rethrow the error for handling in the calling function
    }

    try {
        
        await s3Handler.uploadFiletoS3Upload(data);
        await s3Handler.uploadFiletoS3Download(data); 

        //const result = await runBatchAWS(batchFilePath,data);
        // Return the result of the conversion
    } catch (error) {
        console.error('Error in uploading files to AWS', error);
        throw error; // Rethrow the error for handling in the calling function
    }

    return result;
}
