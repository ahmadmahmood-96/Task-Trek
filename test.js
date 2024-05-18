const {
    Builder,
    By
} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const path = require('path');

(async function loginTest() {
    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(new chrome.Options().addArguments('--headless')) // Use '--headless' argument for headless mode
        .build();

    try {
        await driver.get('http://localhost:3000');

        await driver.findElement(By.id('email')).sendKeys('test@example.com');
        await driver.findElement(By.id('password')).sendKeys('password');
        await driver.findElement(By.id('login')).click();

        let errorElement = await driver.findElement(By.id('error'));
        let errorText = await errorElement.getText();
        if (errorText) {
            console.log('Login failed with error:', errorText);
        } else {
            console.log('Login successful');
        }

        await driver.sleep(2000);
    } finally {
        await driver.quit();
    }
})();