const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const fs = require('fs');

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Temporary storage for uploaded files

// Configure AWS SDK
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

// Upload route
router.post('/uploadtoaws', upload.single('file'), (req, res) => {
    console.log('Request body:', req.body);
    console.log('Uploaded file:', req.file);

    const file = req.file;

    // Check if the file was uploaded
    if (!file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    const params = {
        Bucket: process.env.CADSMARTHUB_FILE_UPLOADS, // Your S3 Bucket Name
        Key: file.filename, // The name you want to save the file as in S3
        Body: fs.createReadStream(file.path), // Read the file from temporary storage
        ContentType: file.mimetype // Set the content type
    };

    s3.upload(params, (error, data) => {
        // Delete the temporary file after upload
        fs.unlink(file.path, (unlinkError) => {
            if (unlinkError) {
                console.error('Error deleting temporary file:', unlinkError);
            }
        });

        if (error) {
            console.error('Error uploading file to S3:', error.message); // Log only the error message
            return res.status(500).json({ error: "Error uploading file to S3" });
        }
        res.status(200).json({ message: "File uploaded successfully", data });
    });
});

// Download route
router.get('/downloadfromaws/:filename', (req, res) => {
    const params = {
        Bucket: process.env.CADSMARTHUB_FILE_DOWNLOAD, // Your S3 Bucket Name
        Key: req.params.filename // The name of the file to download
    };

    s3.getObject(params, (error, data) => {
        if (error) {
            console.error('Error fetching file from S3:', error.message); // Log only the error message
            return res.status(404).json({ error: "File not found in S3" });
        }
        res.attachment(req.params.filename); // Set the filename for the download
        res.send(data.Body); // Send the file data
    });
});

module.exports = router;
