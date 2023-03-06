const mongoose = require('mongoose');
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
  quantity: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: false,
  },
});
const Item = mongoose.model('Item', itemSchema);
module.exports = Item;
