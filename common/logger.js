const fs = require('fs');

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


module.exports = {logTestResult, sleep, testResults}