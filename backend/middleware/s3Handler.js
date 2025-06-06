const axios = require('axios');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const AWS = require('aws-sdk');

// Initialize the S3 client
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

async function uploadFiletoS3(uploadsBucket,fileKey,filePath) {

    // Upload the file to S3
    const uploadParams = {
        Bucket: uploadsBucket,
        Key: fileKey, // Use the filename as the key
        Body: fs.createReadStream(filePath) // Read the file from local storage
    };

    try {
        console.log('File uploading to S3:', uploadsBucket);
        const uploadResponse = await s3.upload(uploadParams).promise();
        console.log('File uploaded successfully to S3:', uploadResponse.Location);
    } catch (error) {
        console.error('Error uploading file to S3:', error);
        throw error; // Handle the error as needed
    }

}

// async function downloadFilefromS3(fileKey,outputFilePath) {

//     console.log('Output file downloaded successfully from S3:', fileKey);
//     // Upload the file to S3
//     try { 
//             const downloadResponse = await axios.get(`http://localhost:5000/api/aws/downloadfromaws/${fileKey}`, {
//             responseType: 'arraybuffer' // Important for binary data
//         });
//         // Write the downloaded file to local disk
//         fs.writeFileSync(outputFilePath, downloadResponse.data);
//         console.log('Output file downloaded successfully from S3:', outputFilePath);
//         resolve({ message: 'Conversion completed successfully', output: stdout });
//     } catch (downloadError) {
//         console.error('Error downloading output file from S3:', downloadError);
//         reject(downloadError); // Handle the error as needed
//     }

// }

async function downloadFilefromS3(bucketName, fileKey, outputPath) {
    return new Promise((resolve, reject) => {
        const params = {
            Bucket: bucketName,
            Key: fileKey,
        };

        const file = fs.createWriteStream(outputPath);
        s3.getObject(params)
            .createReadStream()
            .on('end', () => {
                console.log(`File downloaded successfully from S3: ${outputPath}`);
                resolve(); // Call resolve when the download is complete
            })
            .on('error', (error) => {
                console.error('Error downloading file from S3:', error);
                reject(error); // Call reject on error
            })
            .pipe(file);
    });
}

// Helper function to execute a command
async function executeCommand(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing command: ${error.message}`);
                console.error(`Command stderr: ${stderr}`); // Log stderr for more context
                return reject(error);
            }
            if (stderr) {
                console.warn(`Command stderr: ${stderr}`); // Log stderr if there are warnings
            }
            resolve(stdout);
        });
    });
}

async function uploadFiletoS3Upload(data){
    const uploadsBucket = process.env.CADSMARTHUB_FILE_UPLOADS; // Your uploads bucket name
   
    const uploadsDir = path.join(__dirname, '../Data/uploads'); // Path to uploads directory
   
    // Construct input and output file paths
    const inputFilePath = path.join(uploadsDir, data.filename); // Path to the input PDF file
        
    console.log('inputFilePath :', inputFilePath);
    try {

        await uploadFiletoS3(uploadsBucket,data.filename,inputFilePath);
        console.log(`File downloaded successfully to S3 upload:`, inputFilePath);
    }
    catch (error) {
        console.error('Error in uploading file to S3 bucket:', error); // Log the actual error
        throw error; // Rethrow the error for handling in the calling function
    }

}

async function uploadFiletoS3Download(data){
    
    const downloadsBucket = process.env.CADSMARTHUB_FILE_DOWNLOAD; // Your downloads bucket name
   
    const downloadsDir = path.join(__dirname, '../Data/downloads'); // Path to downloads directory
           
    // Get the filename without extension
    const extension = path.extname(data.filename);
    const fileKey = path.basename(data.filename, extension); 
    // Construct output file path
    const outputFilePath = path.join(downloadsDir, `${fileKey}.DWG`); // Path to the output DWG file    

    console.log('outputFilePath :', outputFilePath);
    try {

        await uploadFiletoS3(downloadsBucket,`${fileKey}.DWG`,outputFilePath);
        console.log(`File upload to S3 Download: ${outputFilePath}`);
    }
    catch (error) {
        console.error('Error in uploading file to S3 bucket:', error); // Log the actual error
        throw error; // Rethrow the error for handling in the calling function
    }
}

// Define an object to export
const s3Handler = {
    uploadFiletoS3,
    downloadFilefromS3,
    uploadFiletoS3Upload,
    uploadFiletoS3Download,
};

module.exports = s3Handler;
