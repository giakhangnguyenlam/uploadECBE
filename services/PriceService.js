const Price = require('../models/PriceModel')

const col = "_id type_product_id company_id source_id des_id price_per_weight"
exports.createPrice = function(req, res, next){
    Price.findOne({company_id : req.body.company_id, source_id: req.body.source_id, des_id:req.body.des_id}, (err, price)=>{
        if(err) return res.json(err);
        if(price != null){
            return res.json("Đơn giá này đã được tạo");
        }
        else{
            const price = new Price(req.body);
            price.save((err, result) => {
                if(err) return res.json(err);
                return res.json(result);
            })
        }
    })
}

exports.deletePrice = function(req, res, next){
    Price.findByIdAndDelete(req.params.id, (err)=>{
        if(err) return res.json(err);
        return res.json("đã xóa thành công đơn giá");
    })
}

exports.updatePrice = function(req, res, next){
    Price.findById(req.params.id, col, (err, price)=>{
        if(err) return res.json(err);
        if(price == null){
            return res.json("Không tìm thấy đơn giá này");
        }
        price.price_per_weight = req.body.price_per_weight;
        price.save((err, result) => {
            if(err) return res.json(err);
            return res.json("update price successed");
        })

    })
}

exports.getPriceByCompanyId = function(req, res, next){
    Price.find({company_id: req.params.id}, (err, price)=>{
        if(err) return res.json(err);
        if(price==null){
            res.json("Không tìm thấy công ty vui lòng kiểm tra lại id");
        }
        else
        {
            return res.json(price);
        }
    })
}

exports.getPriceByProductId = function(req, res, next){
    Price.find({type_product_id: req.params.id}, (err, price)=>{
        if(err) return res.json(err);
        if(price == null){
            return res.json("Mã sản phẩm không đúng vui lòng kiểm tra lại sản phẩm");
        }
        else{
            return res.json(price);
        }
    })
}

exports.getAllPrice = function(req, res, next){
    Price.find({}, (err, price)=>{
        if(err) return res.json(err);
        return res.json(price);
    })
}

exports.findPrice = function(req, res, next){
    Price.find({type_product_id : req.params.id, $or : [{source_id : req.body.source_id, des_id : req.body.des_id}, {source_id: req.body.des_id, des_id : req.body.source_id}]}, col, (err, price) =>{
        if(err) return res.json(err);
        return res.json(price);
    })
}