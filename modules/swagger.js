const swaggerAutogen = require('swagger-autogen')();

const options = {
        info: {
            title: 'Petshion API',
            version: '1.0.0',
            description: 'Petshion API with express',
        },
        host: 'localhost:4500',
        schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = [
    "./routes/index.js"
]

swaggerAutogen(outputFile, endpointsFiles, options);