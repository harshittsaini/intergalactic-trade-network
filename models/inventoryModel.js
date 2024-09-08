const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  stationId: { type: String, required: true, unique: true },
  items: [
    {
      itemId: { type: String, required: true },
      quantity: { type: Number, required: true, default: 0 }
    }
  ],
});

module.exports = mongoose.model('Inventory', inventorySchema);
