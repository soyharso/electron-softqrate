const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
const electron = require('electron');
const isDev = require('electron-is-dev');  // this is required to check if the app is running in development mode. 
const {appUpdater} = require('./autoupdater');

/* Handling squirrel.windows events on windows 
only required if you have build the windows with target squirrel. For NSIS target you don't need it. */
if (require('electron-squirrel-startup')) {
	app.quit();
}

let mainWindow;

// Funtion to check the current OS. As of now there is no proper method to add auto-updates to linux platform.
function isWindowsOrmacOS() {
	return process.platform === 'darwin' || process.platform === 'win32';
}

app.on('ready', () => {
  createWindow();
  
  page.once('did-frame-finish-load', () => {
    const checkOS = isWindowsOrmacOS();
    if (checkOS && !isDev) {
      // Initate auto-updates on macOs and windows
      appUpdater();
    }});
});

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

/*if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}*/


function createWindow () {
  // Create the browser window.
  //if (localStorage.getItem("v")){
			  win = new BrowserWindow({width: 800, height: 600, frame: false, x:1955, y:0, skipTaskbar:true, alwaysOnTop: true, kiosk: true});
			  
			  //win = new BrowserWindow({width: 800, height: 600, resizable: true, movable:true,  x:0, y:0, skipTaskbar:true}); //Depuraciones
	   
	  // Cuando tenga configurado un visor db
	  

  //}else{
      
  //	  win = new BrowserWindow({width: 800, height: 600})	   
  //} 
  //console.log(localStorage.getItem("v"));
  //console.log("prueba");
  // and load the index.html of the app.
  win.loadURL('https://softqrate.appspot.com?');
  /*win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  })) */

  // Open the DevTools.
  //win.webContents.openDevTools()

  win.setFullScreenable(true); 
  win.setFullScreen(true);
	  
  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}



// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
