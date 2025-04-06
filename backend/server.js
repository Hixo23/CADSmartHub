// backend/Server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const path = require('path');


dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 


// Define your routes here
const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/authRoutes'); 
const checkoutRoutes = require('./routes/checkoutRoutes');
const cadRoutes = require('./routes/cadRoutes');
const cadApiMiddleware = require('./middleware/cadApiMiddleware');
const awsRoutes = require('./routes/awsRoutes');
const apiDocsRoutes = require ('./routes/api')
//const conversionRoutes = require('./routes/conversionRoutes');
//const Product = require('./models/Product'); 

app.use('/api', apiRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api', cadRoutes);
app.use('/api', cadApiMiddleware);
app.use('/downloads', express.static(path.join(__dirname,'Data','downloads'))); // Serve static files from downloads
app.use('/api/aws', awsRoutes); // AWS file upload / download
app.use('/api-docs', apiDocsRoutes);
//app.use(conversionRoutes); // Use the conversion routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

