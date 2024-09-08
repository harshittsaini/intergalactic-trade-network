const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
  buyerStationId: String,
  sellerStationId: String,
  items: [
    {
      itemId: String,
      quantity: Number,
      price: Number,
    },
  ],
  status: { type: String, default: 'pending' },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Trade', tradeSchema);
