const { Builder, By } = require('selenium-webdriver');
const assert = require('assert');
const HomePage = require('../page/HomePage');
const ProductPage = require('../page/ProductPage');

describe('ViewedTest', function () {
    let driver;
    let homePage;
    let productPage;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
        homePage = new HomePage(driver);
        productPage = new ProductPage(driver);
    });

    it('testViewedProducts', async function () {
        const productsText = [];

        await driver.get('https://www.21vek.by/headphones/freebudsse2t0016_huawei.html');
        await homePage.waitSeconds(1);

        await homePage.clickAcceptButton();
        await homePage.waitSeconds(1);
        productsText.push(await productPage.getProductTitleText());

        await driver.get('https://www.21vek.by/mobile/galaxya05s4gb128gbsma057f_samsung_8663726.html');
        await homePage.waitSeconds(1);
        productsText.push(await productPage.getProductTitleText());

        await driver.get('https://www.21vek.by/mobile/iphone13128gb_apple_7116374.html');
        await homePage.waitSeconds(1);
        productsText.push(await productPage.getProductTitleText());

        await driver.get('https://www.21vek.by/office_chairs/mio_tesoro_8583355.html');
        await homePage.waitSeconds(1);
        productsText.push(await productPage.getProductTitleText());

        await driver.get('https://www.21vek.by/viewed/');

        const viewedProducts = await driver.findElements(By.css('div.OldProductCard_name__q8eRK a'));

        for (const viewedProduct of viewedProducts) {
            const viewedProductText = await viewedProduct.getText();
            assert(productsText.includes(viewedProductText), `Текст не совпадает: ${viewedProductText}`);
        }
    });

    after(async function () {
        await driver.quit();
    });
});
