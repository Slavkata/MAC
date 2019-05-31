const { app, BrowserWindow } = require('electron');
const isDev = require("electron-is-dev");
const path = require("path");

function createWindow() {
  // Create the browser window.     
  win = new BrowserWindow({ width: 1300, height: 1000, resizable: true })
  win.loadURL(isDev
    ? "http://localhost:3000"
    : `file://${path.join(__dirname, "../build/index.html")}`)
  if (isDev) win.webContents.openDevTools()
}

app.on('ready', createWindow)