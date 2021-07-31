require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const {PORT, MONGO_URI } = process.env;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const offer = require('./models/offer');

const router = require('./routes')(app, offer);

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => console.log('Connected to DB Server'));
mongoose.connect(MONGO_URI,  { 
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
});


var server = app.listen(PORT, ()=>{
    console.log('Server is running on port ' + PORT);
});