const { app, BrowserWindow } = require('electron')
function createWindow() {
  // Create the browser window.     
  win = new BrowserWindow({ width: 1300, height: 1000, resizable: false })
  win.loadURL('http://localhost:3000')
  win.webContents.openDevTools()
}

// and load the index.html of the app.     win.loadFile('index.html')   }      
app.on('ready', createWindow)
