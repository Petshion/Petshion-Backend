const MongoQS = require('mongo-querystring');

module.exports = function(app, product){
  app.get('/',(req, res)=>{
    //#swagger.ignore = true
    res.status(200).end();
  })

  app.post('/product',(req, res) =>{
    //#swagger.tags = ['Product']
    //#swagger.summary = 'DB에 상품정보 등록'
    const Product = new product({
      title: req.body.title, 
      images: req.body.images,
      Brand_name: req.body.Brand_name,
      price: req.body.price,
      kind: req.body.kind,
      content: req.body.content,
      size_content: [["1","2","3","4","5"],["A","B","C","D","E"],["1","2","3","4","5"]],
      size: req.body.size,
      color: req.body.color,
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
    //#swagger.tags = ['Product']
    //#swagger.summary = 'DB에 product_id의 상품정보 요청'
    product.findOne({_id: req.params.product_id}, (err, product) =>{
      if(err) return res.status(500).json({error: err});
      if(!product) return res.status(404).json({error: 'product not found'});
      res.json(product);
    })
  });

  app.get('/main',(req, res)=>{
      //#swagger.tags = ['Product']
      //#swagger.summary = '메인화면 요청'
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

  app.get('/search', (req, res)=>{
    /*  #swagger.tags = ['Product']
        #swagger.summary = '필터링 검색 결과'
        #swagger.parameters['kind'] = {
        in: 'query',
        description: '종',
        type: 'array',
        collectionFormat: 'multi',
} */
/* #swagger.parameters['size'] = {
        in: 'query',
        description: '크기',
        type: 'array',
        collectionFormat: 'multi',
} */
/* #swagger.parameters['color']={
        in: 'query',
        description: '색깔',
        type: 'array',
        collectionFormat: 'multi',

} */
    var qs = new MongoQS();
    var query = qs.parse(req.query);
    console.log(req.query);
    product.find(query, {title:1, images:{$first: "$images"}}, (err, product) =>{
      if(err) return res.status(500).json({error: err});
      if(!product) return res.status(404).json({error: 'product not found'});
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
    });
  })


}

