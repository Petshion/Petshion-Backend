const passport = require('passport');
const googlestrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');

passport.use(User.createStrategy());

passport.serializeUser((user, done) => {
    console.log("serialize");
    done(null, user.access_token);
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
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
},
    function (accessToken, refreshToken, profile, cb) {
        console.log(accessToken, refreshToken);
        var usertk = {
            access_token: accessToken,
            refresh_token: refreshToken
        }
        User.findOrCreate({ googleId: profile.id, username: profile.displayName }, function (err, user) {
            return cb(err, usertk);
        });
        
    }
));
module.exports = passport;