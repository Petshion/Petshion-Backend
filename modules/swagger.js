const swaggerAutogen = require('swagger-autogen')({ language: 'ko' });

const options = {
        info: {
            title: 'Petshion API',
            version: '1.0.0',
            description: 'Petshion API with express',
        },
        host: 'petshion.herokuapp.com',
        schemes: ['https','http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = [
    "./routes/productRT.js",
    "./routes/userRT.js"
]

swaggerAutogen(outputFile, endpointsFiles, options);