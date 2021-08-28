const passport = require('../config/passport.js');

module.exports = function(app, user){
    app.get('/auth/google', passport.authenticate('google', { scope: ['profile','email','openid']}));

    app.get('/auth/google/PetshionOauth', passport.authenticate('google'))
}