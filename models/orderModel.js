const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  orderLocation: {
    type: String,
    default: 'manufacturer',
  },
  currentCustodian: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Order must have a custodian'],
  },
  orderBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Order must belong to a User!'],
  },
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: [true, 'Order must have an item'],
  },
});
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
