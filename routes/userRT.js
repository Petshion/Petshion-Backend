const passport = require('../config/passport.js');
const mongoose = require('mongoose');

module.exports = function(app, user){
    app.get('/auth/google', passport.authenticate('google', { scope: ['profile']})/* #swagger.ignore = true */);
    app.get('/auth/google/PetshionOauth', passport.authenticate('google'), (req, res) =>{
        //#swagger.ignore = true
        res.redirect('OAuthLogin://login?user=' + JSON.stringify(req.user));
    })
    app.get('/pawmark', (req, res) =>{
        //#swagger.tags = ['PawMark']
        //#swagger.summary = '발도장 조회'
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
    app.post('/pawmark/add', (req, res) =>{
        //#swagger.tags = ['PawMark']
        //#swagger.summary = '발도장 추가'
        if(req.isAuthenticated()){
            user.findByIdAndUpdate({_id: req.user.id}, { $addToSet: { pawmark: mongoose.Types.ObjectId(req.body.pawmark) } }, (err, pawmark) =>{
                console.log(pawmark);
                if(err) res.status(500).json({ error: 'database failure', log: err });
                else res.send('success');
            });
        }
        else res.status(401).send('Please login first');
    })
    app.delete('/pawmark/remove', (req, res) =>{
        //#swagger.tags = ['PawMark']
        //#swagger.summary = '발도장 제거'
        if(req.isAuthenticated()){
            user.findByIdAndUpdate({_id: req.user.id }, { $pullAll:{pawmark: [mongoose.Types.ObjectId(req.body.pawmark)] }}, (err, pawmark) =>{
                console.log(pawmark)
                if(err) res.status(500).json({ error: 'database failure',log: err });
                else res.send('success');
            })
        }
        else res.status(401).send('Please login first')
    })
    app.get('/basket', (req, res) =>{
        //#swagger.tags = ['Basket']
        //#swagger.summary = '장바구니 조회'
        if(req.isAuthenticated()){
            user.findOne({_id: req.user.id},{basket: 1}).populate({path: 'basket', populate:{path: 'product_id', select: 'images title'}}).exec((err, userdata) => {
                if(err) throw err;
                var pdt = [];
                console.log(userdata);
                for(var i=0;i<userdata.basket.length;i++){
                    var temp ={
                        user_id: userdata._id,
                        Basket_id: userdata.basket[i]._id,
                        product_id: userdata.basket[i].product_id._id,
                        images: userdata.basket[i].product_id.images[0].toString(),
                        title: userdata.basket[i].product_id.title,
                        selected_color: userdata.basket[i].selected_color,
                        selected_size: userdata.basket[i].selected_size,
                        selected_count: userdata.basket[i].selected_count
                    }
                    console.log(temp);
                    pdt.push(temp);
                }
                res.json(pdt);
            })
        }
        else res.status(401).send('Please login first');
    })
    app.post('/basket/add',(req, res) =>{
        //#swagger.tags = ['Basket']
        //#swagger.summary = '장바구니 추가'
        if(req.isAuthenticated()){
            user.findByIdAndUpdate({_id: req.user.id}, { $addToSet: { basket:{ _id: new mongoose.Types.ObjectId(), product_id: mongoose.Types.ObjectId(req.body.product_id), selected_color: req.body.selected_color, selected_size: req.body.selected_size, selected_count: req.body.selected_count } } }, (err, basket) =>{
                console.log(basket);
                if(err) res.status(500).json({ error: 'database failure', log: err });
                else res.send('success');
            });
        }
        else res.status(401).send('Please login first')
    })
    app.delete('/basket/remove',(req, res) =>{
        //#swagger.tags = ['Basket']
        //#swagger.summary = '장바구니 제거'
        if(req.isAuthenticated()){
            user.findByIdAndUpdate({_id: req.user.id}, { $pull: { basket: { _id: mongoose.Types.ObjectId(req.body._id) }} }, (err, basket) =>{
                console.log(basket);
                if(err) res.status(500).json({ error: 'database failure', log: err });
                else res.send('success');
            });
        }
        else res.status(401).send('Please login first')
    })
    
}