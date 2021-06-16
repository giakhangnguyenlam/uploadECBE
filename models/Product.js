var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
var ProductSchema = new Schema({
    //product_id : Number,
    name : String,
    description : String
});
autoIncrement.initialize(mongoose.connection);
ProductSchema.plugin(autoIncrement.plugin, {model : 'ProductSchema', field: "_id"});
var ProductSchema = mongoose.model('ProductSchema', ProductSchema);

module.exports = ProductSchema;
