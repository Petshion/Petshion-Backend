const passport = require('passport');
const googlestrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');

passport.use(User.createStrategy());

passport.serializeUser((user, done) => {
    console.log("serialize");
    done(null, user.id);
})
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        console.log("deserialize");
        done(err, user)
    })
})

passport.use(new googlestrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "https://petshion.herokuapp.com/auth/google/PetshionOauth"/* "http://localhost:4500/auth/google/PetshionOauth" */,
},
    function (accessToken, refreshToken, profile, cb) {
        console.log(accessToken, refreshToken);
        
        User.findOrCreate({ googleId: profile.id, name: profile._json.name, profileimg: profile._json.picture }, (err, user) => {
            return cb(err, user);
        })
    }
));
module.exports = passport;