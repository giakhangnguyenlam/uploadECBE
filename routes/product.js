var express = require('express');
var router = express.Router();

const {createProduct,deleteProduct, editProduct, getAllProduct, getProductById} = require("../services/ProductService");

router.post("/", createProduct);
router.delete("/:id", deleteProduct);
router.put("/:id", editProduct);
router.get("/", getAllProduct);
router.get("/:id", getProductById);

module.exports = router;