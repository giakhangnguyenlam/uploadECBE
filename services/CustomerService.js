const Customer = require("../models/CustomerModel");
const bcrypt = require('bcrypt')

exports.createCustomer = function(req, res, next){
    Customer.findOne({account: req.body.account}, (err, customer)=>{
        if(customer == null){
            bcrypt.hash(req.body.password, 10, function(err, hash){
                if(err) throw err;
                const customer = new Customer(req.body);
                customer.password = hash;
                customer.district = parseInt(req.body.district);
                customer.save((err, result) => {
                    if(err) throw err;
                    res.json(result);
                })
            })
        }
        else{
            res.json({err:"Account has already used"})
        }
        //next();
    })
}

exports.login = function(req, res, next){
    Customer.findOne({account: req.body.account}).exec(function(err, customer){
        if(!customer)
        {
            return res.json({err:"Username or Password is incorrect"});
        }
        else
        {
            bcrypt.compare(req.body.password, customer.password, (err, result)=>{
                if(result === true){
                    req.session.customer = customer
                    res.json({
                        customer: customer,
                        "login": "success"
                    }, )
                }else{
                    return res.json({err: 'Username or Password is incorrect'})
                }
            })
        }
    })
    //next();
}

exports.logout = function(req, res){
    if (req.session) {
        // delete session object
        req.session.destroy(function(err) {
            if(err) {
                return res.json({err});
            } else {
                return res.json({'logout': "Success"});
            }
        });
    }
}
const col = 'customer_id firstName lastName address city district ward tel account password';
exports.listCustomer = function(req, res, next){    
    Customer.find({}, col, (err, customers) => {
        if(err) return res.json({err});
        res.json({customers: customers})
    }) 
}

exports.detailCustomer = function(req, res, next){
    Customer.findById(req.params.id, col).exec(function(err, customer){
        if(err) {return res.json({err})};
        res.json({customer:customer});
    })
}

exports.editCustomer = function(req, res, next){
    Customer.findById(req.params.id, 'firstName lastName address city district ward tel password', (err, customer)=>{
        if(err) {return res.json({err})}
        customer.firstName = req.body.firstName;
        customer.lastName = req.body.lastName;
        customer.address =  req.body.address;
        customer.city =     req.body.city;
        customer.district = req.body.district;
        customer.ward = req.body.ward;
        customer.tel = req.body.tel;
        customer.password = req.body.password;
        customer.save().then(result => {
            res.json({result: result});
        });

    })
}

exports.deleteCustomer = function(req, res, next){
    Customer.remove({customer_id: req.params.id}, (err)=>{
        if(err) {return res.json({err})}
        res.json({'mess': 'Delete success'});
    })
}