const { Builder } = require('selenium-webdriver');
const assert = require('assert');
const HomePage = require('../page/HomePage');

describe('ErrorTest', function () {
    let driver;
    let homePage;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
        homePage = new HomePage(driver);
    });

    it('test404ErrorPage', async function () {
        await homePage.waitSeconds(2);
        await driver.get('https://www.21vek.by/netuda/');
        await homePage.waitSeconds(2);
        const errorNumber = await homePage.getErrorNumber();
        assert.strictEqual(errorNumber, '404');
        await homePage.waitSeconds(2);
        await driver.get('https://www.21vek.by/mobile/compe213/');
        await homePage.waitSeconds(2);
        const errorHeading = await homePage.getErrorHeading();
        assert.strictEqual(errorHeading, 'Страница не найдена');
    });

    after(async function () {
        await driver.quit();
    });
});
