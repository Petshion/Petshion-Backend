require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const session = require('express-session');
app.use(session({secret:'Mysecret', resave: false, saveUninitialized:true}));

const {PORT, MONGO_URI} = process.env;
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require("./swagger-output");

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

const product = require('./models/product');
const user = require('./models/user.js');

const Passport = require('passport');
app.use(Passport.initialize());
app.use(Passport.session());


const productrouter = require('./routes/productRT')(app, product);
const userrouter = require('./routes/userRT')(app, user);


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