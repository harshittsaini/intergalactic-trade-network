const events = require('events');

// Create an event emitter instance
const eventEmitter = new events.EventEmitter();

// Simulate real-time updates by publishing random events
function publishEvent(eventName, callback) {
  // Simulate data updates every 5 seconds (you can change the interval)
  setInterval(() => {
    const data = {
      timestamp: new Date(),
      eventName,
      data: {
        details: `Random data for ${eventName}`,
        value: Math.random() * 100,
      },
    };
    console.log(`${eventName}:`, data);
    callback(data);
  }, 5000);
}

module.exports = { publishEvent };
