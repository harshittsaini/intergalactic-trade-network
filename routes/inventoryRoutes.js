const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

router.get('/inventory/:stationId', inventoryController.getInventory);
router.post('/inventory', inventoryController.addInventory);

module.exports = router;
