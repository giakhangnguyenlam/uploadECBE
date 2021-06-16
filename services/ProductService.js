const Product = require("../models/Product");

exports.createProduct = function(req, res, next){
    Product.findOne({name: req.body.name}).exec(function(err, product){
        if(product != null){
            res.json("Đã tồn tại sản phẩm");
        }
        else{
            const product = new Product(req.body);
            product.save((err, result)=>{
                if(err) return res.json(err);
                return res.json(result);
            })
        }
    });
}
const col = "_id name description"
exports.editProduct = function(req, res, next){
    Product.findById(req.params.id, col, (err, product)=>{
        if(err) return res.json(err);
        product.name = req.body.name;
        product.description = req.body.description;

        product.save().then(() => {return res.json({"mess":"Update status thành công"});});
    })
}

exports.getAllProduct = function(req, res, next){
    Product.find({}, col, (err, products)=>{
        if(err) return res.json(err);
        return res.json(products);
    })
}

exports.getProductById = function(req, res, next){
    Product.findById(req.params.id, col, (err, product)=>{
        if(err) return res.json(err);
        if(product == null){
            return res.json({"mess":"Không tìm thấy sản phẩm cần tìm"});
        }
        else{
            return res.json(product);
        }
    })
}

exports.deleteProduct = function(req, res, next){
    Product.findByIdAndDelete(req.findById, (err, result)=>{
        if(err) return res.json(err);
        return res.json({"mess":"Xóa thành công"});
    });
}