const http = require('http');
const socketIo = require('socket.io');
const app = require('./app');
const connectDB = require('./config/db'); // Import MongoDB connection function

// Connect to MongoDB
connectDB();

// Create HTTP server and wrap Socket.IO around it
const server = http.createServer(app);
const io = socketIo(server);

// Example real-time updates for trades
const { publishEvent } = require('./services/eventService');

// Emit real-time trade updates to all connected clients
publishEvent('TRADE_UPDATE', (data) => {
  io.emit('tradeUpdate', data);
});

// Example of another event, e.g., cargo shipment status
publishEvent('CARGO_UPDATE', (data) => {
  io.emit('cargoUpdate', data);
});

// Listen for new connections
io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
