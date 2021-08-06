var express = require('express');
var router = express.Router();

module.exports = function(app, product){
  /**
 * @swagger
 *  /product/upload:
 *    post:
 *      tags:
 *      - product
 *      description: 제품 정보 등록
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: body
 *          name: category
 *          required: false
 *          schema:
 *            type: integer
 *            description: 카테고리
 *      responses:
 *       200:
 *        description: 제품 등록 성공
 */
  app.post('/product/upload',(req, res) =>{
    console.log(req.body);
    const Product = new product({
      title: req.body.title, 
      images: req.body.images,
      Brand_name: req.body.Brand_name,
      price: req.body.price,
      kind: req.body.kind,
      content: req.body.content,
      size_content: [["1","2","3","4","5"],["A","B","C","D","E"],["1","2","3","4","5"]],
      size: req.body.size
    })
    Product.save((err) => {
      if(err){
        console.error(err);
      }
      else console.log("success");
    })
  });
  /**
 * @swagger
 *  /api/product/{product_id}:
 *    get:
 *      tags:
 *      - product
 *      description: 특정 제품 정보 조회
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: path
 *          name: product_id
 *          required: true
 *          schema:
 *            type: string
 *            description: 제품 기본키
 *      responses:
 *       200:
 *        description: 제품 조회 성공
 */
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
}

