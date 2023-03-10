const mongoose = require('mongoose');
const eventSchema = new mongoose.Schema({
  event: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  custodian: {
    type: String,
    required: false,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: [true, 'Event must have an item'],
  },
});
const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
