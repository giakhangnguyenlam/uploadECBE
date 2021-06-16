const Customer = require('../models/CustomerModel');

exports.CustomerValidation = function(req, res, next){
    req.checkBody("firstName", "firstName is required").not().isEmpty();
    req.checkBody("lastName", "lastName is required").not().isEmpty();
    req.checkBody("address", "address is required").not().isEmpty();
    req.checkBody("city", "city is required").not().isEmpty();
    req.checkBody("district", "district is required").not().isEmpty();
    req.checkBody("ward", "ward is required").not().isEmpty();
    req.checkBody("tel", "tel is required").not().isEmpty();
    req.checkBody("account", "account is required").not().isEmpty();
    req.checkBody("password", "password is required").not().isEmpty();

    const errors = req.validationErrors();
    if(errors){
        const firstError = errors.map(err => err.msg)[0];
        return res.status(400).json({err:firstError});
    }
    next();
}