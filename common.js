const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');
const logger = require("./logger.js")


async function login(driver) {
  
  await driver.get('https://www.saucedemo.com/');
  logger.logTestResult('Open URL', true);

  await driver.findElement(By.id('user-name')).sendKeys('standard_user');
  await driver.findElement(By.id('password')).sendKeys('secret_sauce');
  await driver.findElement(By.id('login-button')).click();
  logger.logTestResult('Login', true);
}

async function logout(driver) {
    // Add a new test step: Log out
    await driver.findElement(By.className('bm-burger-button')).click();
    await logger.sleep(3000);
    await driver.findElement(By.id('logout_sidebar_link')).click();
    logger.logTestResult('Log Out', true);
}


module.exports = {login, logout}