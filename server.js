// server.js
const { createServer } = require('net');

const server = createServer((socket) => {
  console.log('Client connected');

  socket.on('data', (data) => {
    console.log('@SERVER Received:', data.toString());
    socket.write('Server received: ' + data);
  });

  socket.on('end', () => {
    console.log('Client disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});