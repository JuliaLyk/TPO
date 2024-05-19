const { Builder } = require('selenium-webdriver');
const assert = require('assert');
const ProductPage = require('../page/ProductPage');
const ComparePage = require('../page/ComparePage');
const BasePage = require('../page/BasePage');
const HomePage = require('../page/HomePage');

describe('CompareTest', function () {
    let driver;
    let productPage;
    let comparePage;
    let basePage;
let homePage;
    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
        productPage = new ProductPage(driver);
        comparePage = new ComparePage(driver);
        basePage = new BasePage(driver);
        homePage = new HomePage(driver);//
    });

    it('testCompareProducts', async function () {
     
        await driver.get('https://www.21vek.by/mobile/galaxya558gb256gbsma556elvccaulavendar_samsung_8883431.html');
        await homePage.clickAcceptButton();
        await homePage.waitSeconds(1);
     
        await productPage.clickAddToCompareButton();
        await homePage.waitSeconds(1);

       
        await driver.get('https://www.21vek.by/mobile/iphone13128gb_apple_7116374.html');

      
        await productPage.clickAddToCompareButton();
        await homePage.waitSeconds(1);

     
        await productPage.clickCompareButton();
        await homePage.waitSeconds(1);

       
        const product1 = 'Смартфон Samsung Galaxy A55 8GB/256GB / SM-A556ELVCCAU (Lavendar)';
        const product2 = 'Смартфон Apple iPhone 13 128GB (звездный свет)';

        assert(await comparePage.isProductPresent(product1));
        assert(await comparePage.isProductPresent(product2));
    });

    after(async function () {
        await driver.quit();
    });
});
