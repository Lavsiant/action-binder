import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import * as url from "url";

let win: BrowserWindow | null;

require('@electron/remote/main').initialize();

require("@electron/remote/main").enable(); 

function createWindow() {
  win = new BrowserWindow({
      width: 800,
      height: 500,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        
    }
  }); 

  // win.loadURL(
  //   url.format({
  //     pathname: path.join(__dirname, `/../../dist/action-binder/index.html`),
  //     protocol: "file:", 
  //     slashes: true
  //   })
  // );

  win.loadURL('http://localhost:4200');

  win.webContents.openDevTools();

  win.on("closed", () => {
    win = null;
  });
}

app.on("ready", createWindow);

app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
});