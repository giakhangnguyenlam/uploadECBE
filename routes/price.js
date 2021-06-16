var express = require('express');
var router = express.Router();

const {createPrice, deletePrice, findPrice, getAllPrice, getPriceByCompanyId, getPriceByProductId, updatePrice} = require('../services/PriceService')

router.post("/", createPrice);
router.delete("/:id", deletePrice);
router.get("/type/:id", findPrice);
router.get("/", getAllPrice);
router.get("/company/:id", getPriceByCompanyId);
router.get("/product/:id", getPriceByProductId);
router.put("/:id", updatePrice);

module.exports = router;
