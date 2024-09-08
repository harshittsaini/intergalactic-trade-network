const Cargo = require('../models/cargoModel');
const { publishEvent } = require('../services/eventService');

exports.createCargo = async (req, res) => {
  const { shipmentId, sourceStation, destinationStation, items } = req.body;

  try {
    const cargo = new Cargo({ shipmentId, sourceStation, destinationStation, items });
    await cargo.save();

    // Publish event for cargo status tracking
    publishEvent('CARGO_CREATED', { shipmentId: cargo.shipmentId, ...cargo._doc });

    res.status(201).json({ success: true, cargo });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Cargo creation failed', error });
  }
};

exports.getCargo = async (req, res) => {
  const { shipmentId } = req.params;

  try {
    const cargo = await Cargo.findOne({ shipmentId });
    if (!cargo) {
      return res.status(404).json({ success: false, message: 'Cargo not found' });
    }
    res.status(200).json({ success: true, cargo });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error fetching cargo', error });
  }
};
