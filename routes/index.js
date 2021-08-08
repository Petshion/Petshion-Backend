module.exports = function(app, product){
  
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
    product.find((err, product)=>{
      if(err) return res.status(500).json({error: err});
      res.json(product);
    }).limit(10)
  });

  app.get('/search/:tag', (req, res)=>{
    product.findOne({tag: req.params.tag}, (err, product) =>{
      if(err) return res.status(500).json({error: err});
      if(!product) return res.status(404).json({error: 'product not found'});
      res.json(product);
    });
  })


}

