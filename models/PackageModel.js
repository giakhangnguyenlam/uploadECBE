var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
var PackageSchema = new Schema({
    package_service_id : Number,
    type : Number //Loại 1: 100 lượt vận chuyển, loại 2: 1000, loại 3: 10k
   //rest_num_of_express : Number
});
autoIncrement.initialize(mongoose.connection);
PackageSchema.plugin(autoIncrement.plugin, {model : 'PackageSchema', field: "_id"});
var PackageSchema = mongoose.model('PackageSchema', PackageSchema);

module.exports = PackageSchema;