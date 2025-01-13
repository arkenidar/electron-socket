// main.js
const { app, BrowserWindow } = require('electron');
const { Socket } = require('net');

let mainWindow;
let socket;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.loadFile('index.html');
}

// Create socket connection
function connect() {
  socket = new Socket();
  socket.connect(3000, '127.0.0.1', () => {
    console.log('Connected to server');
    socket.write('Hello from Electron!');
  });

  socket.on('data', (data) => {
    console.log('@CLIENT Received:', data.toString());
  });

  socket.on('close', () => {
    console.log('Connection closed');
  });
}

app.whenReady().then(() => {
  createWindow();
  connect();
});