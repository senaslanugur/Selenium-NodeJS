const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');
const logger = require("./common/logger.js");
const common = require("./common/common.js");
const driver = require("./common/setup.js");

async function run() {

  try {
    // step-1 and step-2
    await common.login(driver.driver);

    
    await driver.driver.findElement(By.css("*[data-test=\"add-to-cart-test.allthethings()-t-shirt-(red)\"]")).click()
    await driver.driver.findElement(By.css("*[data-test=\"add-to-cart-sauce-labs-onesie\"]")).click()
    

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
  fs.writeFileSync('new_test.json', JSON.stringify(logger.testResults, null, 2));
}

run();