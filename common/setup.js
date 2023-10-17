//This is for Chrome

const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const driver = new Builder()
.forBrowser('chrome')
.setChromeOptions(new chrome.Options().headless()) // Optional, for headless mode
.build();



module.exports = {driver}


//  This is for Microft Edge

// const { Builder, By, Key, until } = require('selenium-webdriver');
// const edge = require('selenium-webdriver/edge');

// const driver = new Builder()
//   .forBrowser('MicrosoftEdge')
//   .setEdgeOptions(new edge.Options().headless()) // Optional, for headless mode
//   .build();

// module.exports = { driver }

// this is for Explorer
// const { Builder, By, Key, until } = require('selenium-webdriver');
// const ie = require('selenium-webdriver/ie');

// const driver = new Builder()
//   .forBrowser('internet explorer') // Use 'internet explorer' for IE
// //   .setIeOptions(new ie.Options().headless()) // Optional, for headless mode
//   .build();

// module.exports = { driver };