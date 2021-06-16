var express = require('express');
var router = express.Router();
//var order = require("../models/OrderModel");
//var partner = require("../models/PartnerModel");
//var customer = require("../models/CustomerModel");
//var typeProduct = require("../models/TypeProduct");
//var product = require("../models/Product");
//var price = require("../models/Price"); 
//var package = require("../models/PackageModel");
/* GET home page. */
router.get('/', function(req, res, next) {
  // var initValue = [{
  //   package_service_id : 1,
  //   type : 1, //Loại 1: 100 lượt vận chuyển, loại 2: 1000, loại 3: 10k
  //   rest_num_of_express : 1
  // }];

  // package.create(initValue, function(err, results){
  //   if(err) throw err;
  //     res.json(results);
  // });
  res.render("index");  
});

module.exports = router;
