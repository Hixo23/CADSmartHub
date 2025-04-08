//backend/config/swaggerConfig.js
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        //swagger: '2.0',
        openapi: '3.1.0', // Specify the OpenAPI version        
        info: {
            title: 'CAD Smart Hub API',
            version: '1.0.0',
            description: 'API documentation for the CAD Smart Hub application',
        },
        servers: [
            {
                url: 'http://localhost:5000/api', // server URL
            },
        ],
    },
    
    apis: ['./routes/*.js','./swaggerDocs/invokeServices.js'], // Path to the API docs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerDocs, swaggerUi };
