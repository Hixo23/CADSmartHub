// backend/Server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');


dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Define your routes here
const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/authRoutes'); 
const taskRoutes = require('./routes/taskRoutes');
const checkoutRoutes = require('./routes/checkoutRoutes');
const cadRoutes = require('./routes/cadRoutes');
const cadApiMiddleware = require('./middleware/cadApiMiddleware');
//const Product = require('./models/Product'); 

app.use('/api', apiRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/cad', cadRoutes);
app.use('/api', cadApiMiddleware);  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

