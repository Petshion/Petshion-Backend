var express = require('express');
var router = express.Router();

module.exports = function(app, offer)
{
  app.post('/api/post',(req, res) =>{
    const Offer = new offer({
      title: req.body.title, 
      images: req.body.images,
      Brand_name: req.body.Brand_name,
      price: req.body.price,
      kind: req.body.kind,
      content: req.body.content,
      size_content: req.body.size_content,
      size: req.body.size,
    });
   
    Offer.save((err) => {
      if(err){
        console.error(err);
      }
      console.log("success");
    })
  })

  app.get('/api/offer/:product_id', (req, res)=>{
    offer.findOne({_id: req.params.product_id}, (err, offer) =>{
      if(err) return res.status(500).json({error: err});
      if(!offer) return res.status(404).json({error: 'offer not found'});
      res.json(offer);
    })
  });

}

