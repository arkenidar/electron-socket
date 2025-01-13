
// Title: Minimal Electron Socket
// Description: A minimal Electron application with a socket connection
// Install Node.js
// Install Electron

// https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html

// package.json
/*js*/`
{
  "name": "minimal-electron-socket",
  "version": "1.0.0",
  "main": "main.js",
  "scripts": {
    "start": "npx electron ."
  },
  "dependencies": {
    "electron": "^29.0.0"
  }
}
`

// main.js
const { app, BrowserWindow } = require('electron');
const net = require('net');
const path = require('path');

let mainWindow;
let socket;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 300,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.loadFile('index.html');
}

// Create socket connection
function connect() {
  socket = new net.Socket();
  socket.connect(3000, '127.0.0.1', () => {
    console.log('Connected to server');
    socket.write('Hello from Electron!');
  });

  socket.on('data', (data) => {
    console.log('Received:', data.toString());
  });

  socket.on('close', () => {
    console.log('Connection closed');
  });
}

app.whenReady().then(() => {
  createWindow();
  connect();
});

// server.js
const net = require('net');

const server = net.createServer((socket) => {
  console.log('Client connected');

  socket.on('data', (data) => {
    console.log('Received:', data.toString());
    socket.write('Server received: ' + data);
  });

  socket.on('end', () => {
    console.log('Client disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});

// index.html
/*html*/`
<!DOCTYPE html>
<html>
<head>
  <title>Socket Test</title>
</head>
<body>
  <h3>Check the console for socket messages</h3>
</body>
</html>
`