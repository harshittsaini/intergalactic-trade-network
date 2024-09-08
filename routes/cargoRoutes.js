const express = require('express');
const router = express.Router();
const cargoController = require('../controllers/cargoController');

router.post('/cargo', cargoController.createCargo);
router.get('/cargo/:shipmentId', cargoController.getCargo);

module.exports = router;
