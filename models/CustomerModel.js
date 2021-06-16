var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
//var mongooseIncrement = require('mongoose-increment');
var autoIncrement = require('mongoose-auto-increment');


var CustomerSchema = new Schema({
    customer_id: Number,
    firstName : String,
    lastName : String,
    address : String,
    city : String,
    district : Number, //// địa chỉ được quy định như sau: Quận 1 = 1, Quận 2 = 2, ..., Quận 12 = 12, Quận Thủ Đức = 13, Quận Phú Nhuận = 14, Quận Bình Thạnh = 15, Quận Tân Phú =16, Quận Tân Bình = 17, Quận Gò Vấp = 18, Quận Bình Tân = 19
    ward : String,
    tel : String,
    account : String,
    password : String
});
autoIncrement.initialize(mongoose.connection);
CustomerSchema.plugin(autoIncrement.plugin, {model : 'CustomerSchema', field: "_id"});

var CustomerSchema = mongoose.model('CustomerSchema', CustomerSchema);

module.exports = CustomerSchema;



