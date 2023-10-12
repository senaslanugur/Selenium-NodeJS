const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const driver = new Builder()
.forBrowser('chrome')
.setChromeOptions(new chrome.Options().headless()) // Optional, for headless mode
.build();



module.exports = {driver}