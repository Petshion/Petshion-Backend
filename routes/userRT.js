const passport = require('../config/passport.js');

module.exports = function(app, user){
    app.get('/auth/google', passport.authenticate('google', { scope: ['profile']}));

    app.get('/auth/google/PetshionOauth', passport.authenticate('google'), (req, res) =>{
        console.log(req.user);
        res.send({user: req.user});
    })
    app.get('/user/')
}