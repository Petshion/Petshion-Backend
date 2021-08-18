const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productschema = new Schema({
    title: {
        type: String,
        required: true
    },//제목
    images: {
        type: [String],
    },//이미지 파일 URL배열
    
    brand_name: {
        type: String,
    },//브랜드 이름
    price: {    
        type: Number,
        required: true
    },//가격
    kind: {
        type: String,
        required: true
    },//동물 종
    content: {
        type: String,
    },//내용
    size_content: {
        type: [[String]],
        required: true
    },//사이즈표
    size: {
        type: [String],
        required: true
    },//동물 크기
    rate: {
        type: Number
    },
    color: {
        type: [String],
        required: true
    }
});


module.exports = mongoose.model('Product', productschema);

    