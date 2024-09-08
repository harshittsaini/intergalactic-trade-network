const mongoose = require('mongoose');

const cargoSchema = new mongoose.Schema({
  shipmentId: String,
  sourceStation: String,
  destinationStation: String,
  items: [
    {
      itemId: String,
      quantity: Number,
    },
  ],
  status: { type: String, default: 'in transit' },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Cargo', cargoSchema);
