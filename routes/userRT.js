const passport = require('../config/passport.js');

module.exports = function(app, user){
    app.get('/auth/google', passport.authenticate('google', { scope: ['profile']}));

    app.get('/auth/google/PetshionOauth', (req, res, next)=>{
        passport.authenticate('google', (err) => {
            if(err) next(err);
            res.end()
        });
    });
}