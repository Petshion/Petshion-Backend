module.exports = function(app, product){
  app.get('/',(req, res)=>{
    res.end();
  })

  app.post('/product',(req, res) =>{
    console.log(req.body);
    const Product = new product({
      title: req.body.title, 
      images: req.body.images,
      Brand_name: req.body.Brand_name,
      price: req.body.price,
      kind: req.body.kind,
      content: req.body.content,
      size_content: [["1","2","3","4","5"],["A","B","C","D","E"],["1","2","3","4","5"]],
      size: req.body.size,
      tag: req.body.tag,
    });
    Product.save((err) => {
      if(err){
        console.error(err);
      }
      else console.log("success");
    })
    res.end();
  });

  app.get('/product/:product_id', (req, res)=>{
    product.findOne({_id: req.params.product_id}, (err, product) =>{
      if(err) return res.status(500).json({error: err});
      if(!product) return res.status(404).json({error: 'product not found'});
      res.json(product);
    })
  });

  app.get('/main',(req, res)=>{
      product.find({},{title:1, images:{$first: "$images"}}, (err, product)=>{
      if(err) return res.status(500).json({error: err});
      var pdt = [];
      for(var i=0; i<product.length; i++){
        var temp = {
          images: product[i].images.toString(),
          _id: product[i]._id,
          title: product[i].title
        };
        pdt.push(temp);
      }
      res.json(pdt);
    }).limit(10);
  });

  app.get('/search/:tag', (req, res)=>{
    product.findOne({tag: req.params.tag}, (err, product) =>{
      if(err) return res.status(500).json({error: err});
      if(!product) return res.status(404).json({error: 'product not found'});
      res.json(product.title, product.images);
    });
  })


}

