const passport = require('passport');
const googlestrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');

passport.use(User.createStrategy());

passport.serializeUser((user, done) => {
    done(null, user.id);
})
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user)
    })
})

passport.use(new googlestrategy({
    clientID: process.env.CLIENT_ID,
    clientsecret: process.env.CLIENT_SECRET,
    callbackURL: "https://petshion.herokuapp.com/auth/google/PetshionOauth"/* "http://localhost:4500/auth/google/PetshionOauth" */,
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
},
    function (accessToken, refreshToken, profile, cb) {
        console.log(profile);

        User.findOrCreate({ googleId: profile.id }, (err, user) => {
            return cb(err, user);
        })
    }
));
module.exports = passport;