const swaggerAutogen = require('swagger-autogen')({ language: 'ko' });

const options = {
        info: {
            title: 'Petshion API',
            version: '1.0.0',
            description: 'Petshion API with express',
        },
        host: 'petshion-env-1.eba-pmq8y9je.ap-northeast-2.elasticbeanstalk.com',
        schemes: ['http','https'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = [
    "./routes/productRT.js"
]

swaggerAutogen(outputFile, endpointsFiles, options);