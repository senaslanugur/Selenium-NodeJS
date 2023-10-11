const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');
const logger = require("./logger.js")
const common = require("./common.js")


async function run() {
  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options().headless()) // Optional, for headless mode
    .build();

  try {
    await common.login(driver); // Call the login function


    await driver.findElement(By.className('btn_primary')).click();
    logger.logTestResult('Add to Cart', true);

    
    await driver.findElement(By.id('shopping_cart_container')).click();
    logger.logTestResult('View Shopping Cart', true);


    await common.logout(driver); // Call the logout function
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
