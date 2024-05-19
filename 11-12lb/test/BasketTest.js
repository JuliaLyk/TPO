const { Builder } = require('selenium-webdriver');
const assert = require('assert');
const BasketPage = require('../page/BasketPage');
const ProductPage = require('../page/ProductPage');
const HomePage = require('../page/HomePage');

describe('BasketTest', function () {
    let driver;
    let basketPage;
    let productPage;
    let homePage;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
        basketPage = new BasketPage(driver);
        productPage = new ProductPage(driver);
        homePage = new HomePage(driver);
    });

    it('testAddToBasketAndCheck', async function () {
        await driver.get('https://www.21vek.by/mobile/galaxya558gb256gbsma556elvccaulavendar_samsung_8883431.html');
        await homePage.clickAcceptButton();
        await homePage.waitSeconds(1);
        await productPage.clickAddToBasketButton();
        await homePage.waitSeconds(1);
        const expectedButtonText = 'В корзине';
        assert.strictEqual(await productPage.checkBasketButton(), expectedButtonText);
        await homePage.waitSeconds(1);
        await homePage.clickBasketButton();
        await homePage.waitSeconds(1);
        const expectedProductTitle = 'Смартфон Samsung Galaxy A55 8GB/256GB / SM-A556ELVCCAU (Lavendar)';
        assert.strictEqual(await basketPage.getProductTitle(), expectedProductTitle);
    });

    after(async function () {
        await driver.quit();
    });
});
