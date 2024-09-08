const Inventory = require('../models/inventoryModel');

// Add or Update Inventory for a space station
exports.addInventory = async (req, res) => {
  const { stationId, items } = req.body;

  try {
    // Check if inventory for the station exists
    let inventory = await Inventory.findOne({ stationId });

    if (inventory) {
      // If inventory exists, update items
      items.forEach((newItem) => {
        const existingItem = inventory.items.find(item => item.itemId === newItem.itemId);

        if (existingItem) {
          // Update quantity of the existing item
          existingItem.quantity += newItem.quantity;
        } else {
          // Add new item to the inventory
          inventory.items.push(newItem);
        }
      });
    } else {
      // If inventory doesn't exist, create a new one
      inventory = new Inventory({
        stationId,
        items
      });
    }

    // Save the updated or new inventory
    await inventory.save();

    res.status(201).json({ success: true, inventory });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: 'Failed to update inventory', error });
  }
};

exports.getInventory = async (req, res) => {
  const { stationId } = req.params;

  try {
    const inventory = await Inventory.findOne({ stationId });
    if (!inventory) {
      return res.status(404).json({ success: false, message: 'Inventory not found' });
    }
    res.status(200).json({ success: true, inventory });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error fetching inventory', error });
  }
};
