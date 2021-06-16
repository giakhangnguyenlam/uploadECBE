var express = require('express');
var router = express.Router();

const {createTypeProduct, deleteTypeProduct, findAll, findByCompanyId, findByProductId, updateTypeProduct} = require('../services/TypeProductService');

router.get("/", findAll);
router.post("/", createTypeProduct);
router.delete("/:id", deleteTypeProduct);
router.get("/company/:id", findByCompanyId);
router.get("/product/:id", findByProductId);
router.put("/:id", updateTypeProduct);

module.exports = router;