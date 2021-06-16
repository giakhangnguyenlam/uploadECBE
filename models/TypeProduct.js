var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
var TypeProductSchema = new Schema({
    //type_product_id : Number,
    product_id : Number,
    company_id : Number 
});

autoIncrement.initialize(mongoose.connection);
TypeProductSchema.plugin(autoIncrement.plugin, {model : 'TypeProductSchema', field: "_id"});
var TypeProductSchema = mongoose.model('TypeProductSchema', TypeProductSchema);

module.exports = TypeProductSchema;

