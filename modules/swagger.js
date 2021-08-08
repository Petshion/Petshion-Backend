const swaggerAutogen = require('swagger-autogen')();

const options = {
        info: {
            title: 'Petshion API',
            version: '1.0.0',
            description: 'Petshion API with express',
        },
        host: 'petshion.herokuapp.com',
        schemes: ['https'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = [
    "./routes/index.js"
]

swaggerAutogen(outputFile, endpointsFiles, options);