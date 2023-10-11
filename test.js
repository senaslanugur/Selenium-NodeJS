const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');

// Initialize an empty JSON array to store test results
let testResults = [];

function logTestResult(testName, isPassed) {
  const result = {
    testName: testName,
    isPassed: isPassed,
    timestamp: new Date().toLocaleString(),
  };
  testResults.push(result);

  if (isPassed) {
    console.log(`✅ ${testName} - Passed`);
  } else {
    console.error(`❌ ${testName} - Failed`);
  }
}


const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};


async function run() {
  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options().headless()) // Optional, for headless mode
    .build();

  try {
    await driver.get('https://www.saucedemo.com/');
    logTestResult('Open URL', true);

    await driver.findElement(By.id('user-name')).sendKeys('standard_user');
    await driver.findElement(By.id('password')).sendKeys('secret_sauce');
    await driver.findElement(By.id('login-button')).click();
    logTestResult('Login', true);

    await driver.findElement(By.className('btn_primary')).click();
    logTestResult('Add to Cart', true);

    await driver.findElement(By.id('shopping_cart_container')).click();
    logTestResult('View Shopping Cart', true);

    // Add a new test step: Log out
    await driver.findElement(By.className('bm-burger-button')).click();
    await sleep(3000);
    await driver.findElement(By.id('logout_sidebar_link')).click();
    logTestResult('Log Out', true);

    const screenshot = await driver.takeScreenshot();
    fs.writeFileSync('screenshot.png', screenshot, 'base64');
    logTestResult('Take Screenshot', true);

  } catch (error) {
    logTestResult('Exception', false);
    console.error(error);
  } finally {
    driver.quit();
  }

  // Write the test results to a JSON file
  fs.writeFileSync('testResults.json', JSON.stringify(testResults, null, 2));
}

run();
