const TypeProduct = require("../models/TypeProduct");

const col = "product_id company_id";
exports.createTypeProduct = function(req, res, next){
    TypeProduct.findOne({product_id : req.body.product_id, company_id : req.body.company_id}).exec(function(err, typeProduct){
        if(err) return res.json(err);
        if(typeProduct!=null){
            return res.json("Sản phẩm này đã được tạo cho công ty");
        }
        else{
            const typeProduct = new TypeProduct(req.body);
            typeProduct.save((err, result) =>{
                if(err) return res.json(err);
                return res.json(result);
            })
        }
    })
}

exports.updateTypeProduct = function(req, res, next){
    TypeProduct.findById(req.params.id, col, (err, typeProduct) =>{
        if(err) return res.json(err);
        typeProduct.company_id = req.body.company_id;
        typeProduct.product_id = req.body.product_id;
        typeProduct.save().then((result) => {return res.json(result)});
    })
}

exports.findByProductId = function(req, res, next){
    TypeProduct.find({product_id : req.params.id}).exec((err, typeProduct)=>{
        if(err) return res.json(err);
        if(typeProduct == null){
            return res.json("sản phẩm này chưa có công ty nào đăng ký vận chuyển");
        }
        else{
            return res.json(typeProduct);
        }
        
    })
}

exports.findByCompanyId = function(req, res, next){
    TypeProduct.find({company_id : req.params.id}, (err, typeProduct)=>{
        if(err) return res.json(err);
        if(typeProduct == null){
            res.json("Không tìm thấy công ty");
        }
        else{
            res.json(typeProduct);
        }
    })
}

exports.findAll = function(req, res, next){
    TypeProduct.find({}, (err, typeProduct)=>{
        if(err) return res.json(err);
        return res.json(typeProduct);
    })
}

exports.deleteTypeProduct = function(req, res, next){
    TypeProduct.findByIdAndDelete(req.params.id, (err)=>{
        if(err) return res.json(err);
        return res.json("Delete thành công");
    })
}