const { Builder } = require('selenium-webdriver');
const assert = require('assert');
const HomePage = require('../page/HomePage');
const BasketPage = require('../page/BasketPage');
const ProductPage = require('../page/ProductPage');

describe('PromocodeTest', function () {
    let driver;
    let homePage;
    let basketPage;
    let productPage;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
        homePage = new HomePage(driver);
        basketPage = new BasketPage(driver);
        productPage = new ProductPage(driver);
    });

    it('testAddToBasketAndCheck', async function () {
        await driver.get('https://www.21vek.by/mobile/galaxya558gb256gbsma556elvccaulavendar_samsung_8883431.html');
        await homePage.clickAcceptButton();
        await homePage.waitSeconds(2);
        await productPage.clickAddToBasketButton();
        await homePage.waitSeconds(2);
        await homePage.clickBasketButton();

        await homePage.waitSeconds(2);
        await basketPage.enterPromocodeQuery('utkanos');
        await homePage.waitSeconds(2);
        const errorMessage = await basketPage.getPromocodeErrorMessage();
        assert.strictEqual(errorMessage, 'Промокод недействителен');
    });

    after(async function () {
        await driver.quit();
    });
});
