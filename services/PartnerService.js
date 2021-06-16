const Partner = require('../models/PartnerModel')
const bcrypt = require('bcrypt')

const col = "_id name address tel email business_license account total_shipping password"
exports.createPartner = function(req, res, next){
    Partner.findOne({account : req.body.account}, (err, partner)=>{
        if(err) return res.json(err);
        if(partner != null){
            res.json("Partner is already existed");
        }
        else{
            bcrypt.hash(req.body.password, 10, function(err, hash){
                if(err) throw err;
                const partner = new Partner(req.body);
                partner.password = hash;
                partner.save((err, result) => {
                    if(err) throw err;
                    res.json(result);
                })
            })
        }
    })
}

exports.updatePartner = function(req, res, next){
    Partner.findById(req.params.id, col, (err, partner)=>{
        if(err) return res.json(err);
        if(partner == null){
            res.json("The Partner hasn't already exits");
        }
        else{
            partner.name = req.body.name;
            partner.address = req.body.address;
            partner.tel = req.body.tel;
            partner.email = req.body.email;
            partner.business_license = req.body.business_license;
            partner.password = req.body.password;
            partner.save((err, result)=>{
                if(err) return err;
                return res.json(result);
            })
        }
    })
}

exports.updateSlotShipping = function(req, res, next){
    Partner.findById(req.params.id, 'total_shipping', (err, partner)=>{
        if(err) return res.json(err);
        if(partner==null){
            res.json("Partner hasn't already existed");
        }
        else{
            partner.total_shipping =  partner.total_shipping + req.body.total_shipping;
            partner.save((err, result)=>{
                if(err) return res.json(err)
                return res.json(result);
            })
        }
    })
}

exports.getAllPartner = function(req, res, next){
    Partner.find({}, col, (err, partner)=>{
        if(err) return res.json(err)
        return res.json(partner);
    })
}

exports.getPartner = function(req, res, next){
    Partner.findById(req.params.id, col, (err, result)=>{
        if(err) return res.json(err)
        if(result == null){
            res.json("The partner hasn't existed");
        }
        else{
            res.json(result);
        }
    })
}

exports.deletePartner = function(req, res, next){
    Partner.findByIdAndDelete(req.params.id, (err, result)=>{
        if(err) return res.json(err)
        return res.json(result);
    })
}

exports.subtractSlotShipping = function(req, res, next){
    Partner.findById(req.body.company_id, col, (err, partner) =>{
        partner.total_shipping =  partner.total_shipping - 1;
        partner.save((err, result)=>{
            if(err) return res.json(err)
        })
    })
}