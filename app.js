require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

/* const googlestrategy = require('passport-google-oauth20').Strategy;
passport.use(new googlestrategy({
    clientID: process.env.CLIENT_ID,
    clientsecret: process.env.CLIENT_SECRET,
    callbackURL: "http://Petshion-env-1.eba-pmq8y9je.ap-northeast-2.elasticbeanstalk.com/auth/google/PetshonOauth"
    },
    function(accessToken, refreshToken, profile, cb) {
        User.findOr
    }
)) */

const {PORT, MONGO_URI } = process.env;
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require("./swagger-output");

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

const product = require('./models/product');
//const user = require('./models/user.js');
const productrouter = require('./routes/productRT')(app, product);
//const userrouter = require('./routes/userRT')(app, user);

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => console.log('Connected to DB Server'));
mongoose.connect(MONGO_URI,  { 
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
});


var server = app.listen(process.env.PORT || PORT, ()=>{
    console.log('Server is running on port ' + PORT);
});