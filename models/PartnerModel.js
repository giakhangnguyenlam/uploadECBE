var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
var PartnerSchema = new Schema({
    company_id: Number, 
    name: String,
    address: String,
    tel : String,
    email :String,
    business_license : String,
    account: String,
    password : String,
    //package_service_id : Number
    total_shipping : Number
});
autoIncrement.initialize(mongoose.connection);
PartnerSchema.plugin(autoIncrement.plugin, {model : 'PartnerSchema', field: "_id"});
var PartnerSchema = mongoose.model('PartnerSchema', PartnerSchema);

module.exports = PartnerSchema;