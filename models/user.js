const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const findOrCreate = require('mongoose-findorcreate');

var Basket = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    product_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
    selected_color:{
        type: String
    },
    selected_size:{
        type: String
    },
    selected_count:{
        type: Number
    }
})

var userschema = new Schema({
    googleId: String,
    username: String,
    image: String,
    basket: [Basket],
    pawmark: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Product'
    }],
})
userschema.plugin(passportLocalMongoose);
userschema.plugin(findOrCreate);

module.exports = mongoose.model('User', userschema);