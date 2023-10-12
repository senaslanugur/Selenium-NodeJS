const { Builder, By, Key, until } = require('selenium-webdriver');
const ie = require('selenium-webdriver/ie');

const fs = require('fs');
const logger = require("./common/logger.js");
const common = require("./common/common.js");
const driver = require("./common/setup.js");

async function run() {

  try {
    // step-1 and step-2
    await common.login(driver.driver);


    //step-3
    await driver.driver.findElement(By.className('btn_primary')).click();
    logger.logTestResult('Add to Cart', true);

    //step-4
    await driver.driver.findElement(By.id('shopping_cart_container')).click();
    logger.logTestResult('View Shopping Cart', true);

    //step-5
    await common.logout(driver.driver); // Call the logout function
    

    //screenshot
    const screenshot = await driver.driver.takeScreenshot();
    fs.writeFileSync('screenshot.png', screenshot, 'base64');
    logger.logTestResult('Take Screenshot', true);
    
   

  } catch (error) {
    logger.logTestResult('Exception', false);
    console.error(error);
  } finally {
    driver.driver.quit();
  }

  // Write the test results to a JSON file
  fs.writeFileSync('testResults.json', JSON.stringify(logger.testResults, null, 2));
}

run();