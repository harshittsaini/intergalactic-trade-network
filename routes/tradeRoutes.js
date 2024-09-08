const express = require('express');
const router = express.Router();
const tradeController = require('../controllers/tradeController');

router.post('/trades', tradeController.createTrade);
router.get('/trades/:transactionId', tradeController.getTrade);

module.exports = router;
