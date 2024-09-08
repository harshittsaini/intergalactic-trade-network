const Trade = require('../models/tradeModel');
const Inventory = require('../models/inventoryModel');
const { publishEvent } = require('../services/eventService');

exports.createTrade = async (req, res) => {
  const { buyerStationId, sellerStationId, items, price } = req.body;

  try {
    const trade = new Trade({ buyerStationId, sellerStationId, items, price });
    await trade.save();

    // Publish event for inventory update and trade processing
    publishEvent('TRADE_INITIATED', { tradeId: trade._id, ...trade._doc });

    res.status(201).json({ success: true, trade });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Trade creation failed', error });
  }
};

exports.getTrade = async (req, res) => {
  const { transactionId } = req.params;

  try {
    const trade = await Trade.findById(transactionId);
    if (!trade) {
      return res.status(404).json({ success: false, message: 'Trade not found' });
    }
    res.status(200).json({ success: true, trade });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error fetching trade', error });
  }
};
