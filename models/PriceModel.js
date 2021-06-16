var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
var PriceSchema = new Schema({
    //price_table_id : Number,
    type_product_id : Number,
    company_id : Number,
    source_id : Number,
    des_id : Number,
    price_per_weight : Number 
});

autoIncrement.initialize(mongoose.connection);
PriceSchema.plugin(autoIncrement.plugin, {model : 'PriceSchema', field: "_id"});
var PriceSchema = mongoose.model('PriceSchema', PriceSchema);

module.exports = PriceSchema;