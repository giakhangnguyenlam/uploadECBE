var express = require('express');
var router = express.Router();
const {createCustomer, login, logout, listCustomer, detailCustomer, editCustomer, deleteCustomer} = require('../services/CustomerService');
const {CustomerValidation} =  require('../Validator/CustomerValidation');


router.get('/', function(req, res, next) {
    res.render("index");  
  });

function requiresLogin(req, res, next) {
    if (req.session && req.session.customer) {
        return next();
    } else {
        return res.json({err: 'You must be logged in to view this page.'});
    }
}

router.post('/login', login);
router.get('/', requiresLogin, listCustomer);
router.get('/:id', requiresLogin, detailCustomer);
router.post('/', CustomerValidation, createCustomer);
router.put('/:id', requiresLogin, editCustomer);
router.delete('/:id', requiresLogin, deleteCustomer);
router.get('/logout', requiresLogin, logout);

module.exports = router;