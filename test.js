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

async function run() {
  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options().headless()) // Optional, for headless mode
    .build();

  try {
    await login(driver); // Call the login function
    await driver.findElement(By.className('btn_primary')).click();
    logger.logTestResult('Add to Cart', true);

    await driver.findElement(By.id('shopping_cart_container')).click();
    logger.logTestResult('View Shopping Cart', true);

    // Add a new test step: Log out
    await driver.findElement(By.className('bm-burger-button')).click();
    await logger.sleep(3000);
    await driver.findElement(By.id('logout_sidebar_link')).click();
    logger.logTestResult('Log Out', true);

    const screenshot = await driver.takeScreenshot();
    fs.writeFileSync('screenshot.png', screenshot, 'base64');
    logger.logTestResult('Take Screenshot', true);

  } catch (error) {
    logger.logTestResult('Exception', false);
    console.error(error);
  } finally {
    driver.quit();
  }

  // Write the test results to a JSON file
  fs.writeFileSync('testResults.json', JSON.stringify(logger.testResults, null, 2));
}

run();
