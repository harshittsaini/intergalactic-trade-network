const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Import routes
const tradeRoutes = require('./routes/tradeRoutes');
const cargoRoutes = require('./routes/cargoRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const realTimeRoutes = require('./routes/realTimeRoutes');

app.use('/api', tradeRoutes);
app.use('/api', cargoRoutes);
app.use('/api', inventoryRoutes);
app.use('/api', realTimeRoutes);

module.exports = app;
