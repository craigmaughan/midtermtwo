var mongoose = require('mongoose');
var ProductSchema = new mongoose.Schema({
  title: String,
  price: String,
  URL: String,
  purchases: {type: Number, default: 0},
});
ProductSchema.methods.purchase = function(cb) {
  this.purchases += 1;
  this.save(cb);
};
mongoose.model('Product', ProductSchema);
