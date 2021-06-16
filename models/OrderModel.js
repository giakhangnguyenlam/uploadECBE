var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
//var mongooseIncrement = require('mongoose-increment');
var autoIncrement = require('mongoose-auto-increment');
// var incrementOrder = mongooseIncrementOrder(mongoose);
//var connection = mongoose.createConnection("mongodb+srv://EC:123@cluster0.ylvzs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
 
//autoIncrement.initialize(connection);

var OrderSchema = new Schema({
    //order_id: Number,
    pick_id: Number,
    receiver_name : String,
    receiver_address: String,
    receiver_district: Number, // địa chỉ được quy định như sau: Quận 1 = 1, Quận 2 = 2, ..., Quận 12 = 12, Quận Thủ Đức = 13, Quận Phú Nhuận = 14, Quận Bình Thạnh = 15, Quận Tân Phú =16, Quận Tân Bình = 17, Quận Gò Vấp = 18, Quận Bình Tân = 19
    receiver_ward : String,
    receiver_tel : String, 
    option_weight : Number, //lựa chọn khối lượng như sau: <1 kg = 1, <5 kg =2, <10kg = 3, <15 kg = 4, 20kg = 5, >20 kg = 6
    pick_date : String, 
    deliver_date : String,
    type_product_id : Number,
    status : Number, //Đang xác nhận = 1, Đang giao hàng = 2, Giao hàng thành công = 3
    company_id : Number,
    money : Number,
    message : String
});
autoIncrement.initialize(mongoose.connection);
OrderSchema.plugin(autoIncrement.plugin, {model : 'OrderSchema', field: "_id"});
// OrderSchema.plugin(incrementOrder, {
//     modelName: 'OrderSchema',
//     fieldName: '_id',
// });

var Order = mongoose.model('OrderSchema', OrderSchema);

module.exports = Order;

// autoIncrement.initialize(mongoose.connection); // This is important. You can remove initialization in different file
// OrderSchema.plugin(autoIncrement.plugin, {
//   model: 'OrderSchema',
//   field: 'order_id',
//   startAt: 1,
//   incrementBy: 1
// });