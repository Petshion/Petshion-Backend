const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const findOrCreate = require('mongoose-findorcreate');

var Basket = new Schema({
    color:{
        type: String
    },
    size:{
        type: String
    },
    count:{
        type: Number
    }
})

var userschema = new Schema({
    googleId: String,
    username: String,
    image: String,
    basket: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Basket'
    }],
    jjim: [String],
})
userschema.plugin(passportLocalMongoose);
userschema.plugin(findOrCreate);

module.exports = mongoose.model('User', userschema);