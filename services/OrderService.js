const moment = require("moment");
const Order = require("../models/OrderModel");
const {subtractSlotShipping} = require("../services/PartnerService");
//tạo ra Order mới
exports.createOrder = function(req, res, next){
    // req.body.pick_date = moment(req.body.pick_date, "DD-MM-YYYY");
    // req.body.deliver_date = moment(req.body.deliver_date, "DD-MM-YYYY");
    const order = new Order(req.body);
    subtractSlotShipping(req, res, next);
    // order.pick_date = moment(req.body.pick_date, "DD-MM-YYYY");
    // order.deliver_date = moment(req.body.deliver_date, "DD-MM-YYYY");
    order.save((err, result) => {
        if(err) throw err;
        // result.pick_date = result.pick_date.toString();
        // result.deliver_date = result.deliver_date.toString();
        res.json(result);
    });
}

//Lấy danh sách các order
const col = "_id order_id pick_id receiver_name receiver_address receiver_district receiver_ward receiver_tel option_weight pick_date deliver_date type_product_id status company_id money message"
exports.listOrders =function(req, res, next){
    Order.find({}, col, (err, orders) => {
        if(err) return res.json(err);
        // orders.pick_date = orders.pick_date.toString();
        // orders.deliver_date = orders.deliver_date.toString();
        res.json({orders: orders})
    })
}

exports.findOrderById = function(req, res, next){
    Order.findById(req.params.id, col, (err, order) => {
        if(err) return res.json(err);
        if(order == null){
            return res.json("Không tìm thấy đơn hàng");
        }
        else
        {
            res.json(order);
        }
    })
}

exports.editOrder = function(req, res, next){
    Order.findById(req.params.id, col, (err, order) => {
        if(err) return res.json(err);
        if(order == null){
            return res.json("Không tìm thấy đơn hàng");
        }
        else{
            order.receiver_name = req.body.receiver_name;
            order.receiver_address = req.body.receiver_address;
            order.receiver_district = req.body.receiver_district;
            order.receiver_ward = req.body.receiver_ward;
            order.receiver_tel = req.body.receiver_tel;
            order.option_weight = req.body.option_weight;
            order.pick_date = req.body.pick_date;
            order.deliver_date = req.body.deliver_date;
            order.company_id = req.body.company_id;
            order.message = req.body.message;

            order.save().then(result =>{
                res.json(result);
            });
        }
    })
}

exports.updateStatus = function (req, res, next){
    Order.findById(req.params.id, "status", (err, order)=>{
        order.status = req.body.status;
        order.save().then(result => {
            return res.json({"mess":"Update status thành công"});
        })
    });
}

exports.deleteOrder = function(req, res, next){
    Order.findByIdAndDelete(req.params.id, (err, result)=>{
        if(err) return res.json(err);
        res.json({'mess':'Delete thành công'});
    })
}