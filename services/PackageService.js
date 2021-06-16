const Package =  require("../models/PackageModel");

col = "_id type";

exports.createPackage = function(req, res, next){
    Package.findOne({type : req.body.type}, (err, package)=>{
        if(err) return res.json(err);
        if(package != null){
            res.json("Package is already existed");
        }
        else{
        const package = new Package(req.body);
        package.save((err, result) =>{
        if(err) return res.json(err);
        return res.json(result);
    })
        }
    })
    
}

exports.updatePackage = function(req, res, next){
    Package.findById(req.params.id, "_id type", (err, package)=>{
        if(err) return res.json(err)
        if(package == null){
            return res.json("Package isn't exist");
        }
        else
        {
            package.type = req.body.type;
            package.save((err, result) =>{
                if(err) throw res.json(err);
                return res.json(result);
            })
        }  
    })
}

exports.listPackages = function(req, res, next){
    Package.find({}, "_id type", (err, package)=>{
        if(err) return res.json(err);
        return res.json(package);
    })
}

exports.findPackageById = function(req, res, next){
    Package.findById(req.params.id, "_id type", (err, result) => {
        if(err) return res.json(err)
        return res.json(result);
    })
}

exports.deletePackage = function(req, res, next){
    Package.findByIdAndDelete(req.params.id, (err, result)=>{
        if(err) return res.json(err);
        return res.json({"mess":"Delete package successed"})
    })
}