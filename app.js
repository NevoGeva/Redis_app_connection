import { createClient } from '@redis/client';
const client = createClient(); // Create Redis client


client.on('connect', () => {
  console.log('Connected to Redis...');
});


client.on('error', (err) => {
  console.error('Redis client error:', err);
});


// Ensure that client is properly connected and not closed before publishing messages
client.connect()
  .then(() => {
    // Publish a message every second
    setInterval(() => {
      const message = 'Hello from Node.js at ' + new Date().toISOString();
      client.publish('my_channel', message)
        .then(() => {
          console.log(`Message sent: ${message}`);
        })
        .catch((err) => {
          console.error('Error publishing message:', err);
        });
    }, 1000); // Publish every second
  })
  .catch((err) => {
    console.error('Error connecting to Redis:', err);
 });


