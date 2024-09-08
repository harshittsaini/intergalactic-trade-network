const express = require('express');
const router = express.Router();

// This route provides real-time updates from the backend
router.get('/real-time', (req, res) => {
  res.status(200).json({
    message: 'Real-time updates are being handled via WebSocket',
    instructions: 'Connect via Socket.IO for real-time updates.',
  });
});

module.exports = router;
