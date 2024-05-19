const { Builder } = require('selenium-webdriver');
const assert = require('assert');
const HomePage = require('../page/HomePage');

describe('GeographyTest', function () {
    let driver;
    let homePage;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
        homePage = new HomePage(driver);
    });

    it('testGeoError', async function () {
        await driver.get('https://www.21vek.by/order/');
        await homePage.waitSeconds(2);
        await homePage.clickAcceptButton();
        await homePage.waitSeconds(2);
        await homePage.clickGeoButton();
        await homePage.waitSeconds(2);
        await homePage.inputGeo('tudasuda');
        await homePage.waitSeconds(2);

        const errorMessage = await homePage.getGeoError();
        assert.strictEqual(errorMessage, 'Выберите населенный пункт из списка');
    });

    after(async function () {
        await driver.quit();
    });
});
