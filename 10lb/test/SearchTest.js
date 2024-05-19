const { Builder, By } = require('selenium-webdriver');
const assert = require('assert');
const HomePage = require('./HomePage.js');

(async function PageObjectTests() {
    let driver = await new Builder().forBrowser('chrome').build();
    let homePage = new HomePage(driver);

    try {
        // Тест на поиск продукта
        await driver.get('https://www.21vek.by/order');
        await homePage.waitSeconds(2);

        await homePage.clickAcceptButton();
        await homePage.waitSeconds(2);

        await homePage.enterSearchQuery('Apple');
        await homePage.waitSeconds(2);

        const resultLink = await driver.findElement(By.css('.result__link'));
        const isDisplayed = await resultLink.isDisplayed();
        assert.strictEqual(isDisplayed, true);

        const resultProductName = await driver.findElement(By.css('.result__name')).getText();
        assert.strictEqual(resultProductName.includes('Apple'), true);
        console.log("Успешно поиск");
        // Тест на 404 ошибку
        await homePage.waitSeconds(2);
        await driver.get('https://www.21vek.by/qwertys/');
        await homePage.waitSeconds(2);
        const errorNumber = await homePage.getErrorNumber();
        assert.strictEqual(errorNumber, '404');

        await homePage.waitSeconds(2);
        await driver.get('https://www.21vek.by/mobile/compe213/');
        await homePage.waitSeconds(2);
        const errorHeading = await homePage.getErrorHeading();
        assert.strictEqual(errorHeading, 'Страница не найдена');
        console.log("Успешно 404");
    } 
    finally {
        await driver.quit();
    }
})();