const passport = require('../config/passport.js');
const mongoose = require('mongoose');

module.exports = function(app, user, product){
    app.get('/auth/google', passport.authenticate('google', { scope: ['profile']}));

    app.get('/auth/google/PetshionOauth', passport.authenticate('google'), (req, res) =>{
        res.redirect('OAuthLogin://login?user=' + JSON.stringify(req.user));
    })
    app.post('/pawmark/add', (req, res) =>{
        if(req.isAuthenticated()){
            user.findByIdAndUpdate({_id: req.user.id}, { $addToSet: { pawmark: mongoose.Types.ObjectId(req.body.pawmark) } }, (err, pawmark) =>{
                console.log(pawmark);
                if(err) res.status(500).json({ error: 'database failure', log: err });
                else res.send('success');
            });
        }
        else res.status(401).send('Please login first');
    })
    app.put('/pawmark/remove', (req, res) =>{
        if(req.isAuthenticated()){
            user.findByIdAndUpdate({_id: req.user.id }, { $pullAll:{pawmark: [mongoose.Types.ObjectId(req.body.pawmark)] }}, (err, pawmark) =>{
                console.log(pawmark)
                if(err) res.status(500).json({ error: 'database failure',log: err });
                else res.send('success');
            })
        }
    })
    app.get('/pawmark', (req, res) =>{
        if(req.isAuthenticated()){
            user.findOne({_id: req.user.id}, {title:1, images:{$first: "$images"}}).populate('pawmark').exec((err, user) => {
                if(err) throw err;
                var pdt = [];
                for(var i=0; i<user.pawmark.length; i++){
                    var temp = {
                        images: user.pawmark[i].images.toString(),
                        _id: user.pawmark[i]._id,
                        title: user.pawmark[i].title
                    };
                    pdt.push(temp);
                }
                res.json(pdt);
            })
        }
        else res.status(401).send('Please login first');
    })
    app.post('/basket/add',(req, res) =>{
        if(req.isAuthenticated()){
            user.findByIdAndUpdate({_id: req.user.id}, { $addToSet: { basket:{ _id: new mongoose.Types.ObjectId(), product_id: mongoose.Types.ObjectId(req.body.product_id), selected_color: req.body.selected_color, selected_size: req.body.selected_size, selected_count: req.body.selected_count } } }, (err, basket) =>{
                console.log(basket);
                if(err) res.status(500).json({ error: 'database failure', log: err });
                else res.send('success');
            });
        }
    })
    app.delete('/basket/remove',(req, res) =>{
        if(req.isAuthenticated()){
            user.findByIdAndRemove({_id: req.user.id}, { $pull: { basket: { _id: mongoose.Types.ObjectId(req.body._id) }} }, (err, basket) =>{
                console.log(basket);
                if(err) res.status(500).json({ error: 'database failure', log: err });
                else res.send('success');
            });
        }
    })
    app.get('/basket', (req, res) =>{
        if(req.isAuthenticated()){
            user.findOne({_id: req.user.id}, (err, user) => {
                if(err) throw err;
                user.basket.findOne({_id: req.user.id}, {title:1, images:{$first: "$images"}}).populate('product_id').exec((err, product_id) => {
                    if(err) throw err;
                    var pdt = [];
                    for(var i=0; i<product_id.pawmark.length; i++){
                        var temp = {
                            images: user.pawmark[i].images.toString(),
                            _id: user.pawmark[i]._id,
                            title: user.pawmark[i].title
                        };
                        pdt.push(temp);
                    }
                    res.json(pdt);
                })
            })
        }
        else res.status(401).send('Please login first');
    })
}