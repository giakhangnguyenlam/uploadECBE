var express = require('express');
var router = express.Router();
const {createOrder, listOrders, findOrderById, editOrder, deleteOrder, updateStatus, findByCompanyId} = require("../services/OrderService");


function requiresLogin(req, res, next) {
    if (req.session && req.session.customer) {
        return next();
    } else {
        return res.json({err: 'You must be logged in to view this page.'});
    }
}

router.post("/", createOrder);
router.get("/", listOrders);
router.get("/:id", findOrderById);
router.delete("/:id", deleteOrder);
router.put("/:id", editOrder);
router.put("/status/:id", updateStatus);
router.get("/company/:id", findByCompanyId);
module.exports = router;