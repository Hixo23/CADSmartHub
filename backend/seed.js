// backend/seed.js
/*const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const Product = require('./models/Product'); // Create a separate file for the Product model

const products = [
    {
        name: 'Sample Product 1',
        description: 'This is a description for product 1.',
        price: 29.99,
        imageUrl: 'https://via.placeholder.com/150',
    },
    {
        name: 'Sample Product 2',
        description: 'This is a description for product 2.',
        price: 39.99,
        imageUrl: 'https://via.placeholder.com/150',
    },
];

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        await Product.deleteMany({});
        await Product.insertMany(products);
        console.log('Database seeded!');
        mongoose.connection.close();
    })
    .catch(err => console.log(err));
    */