const { Builder, By } = require('selenium-webdriver');
const assert = require('assert');
const ProductPage = require('../page/ProductPage');
const HomePage = require('../page/HomePage');

describe('FavoritesTest', function () {
    let driver;
    let productPage;
    let homePage;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
        productPage = new ProductPage(driver);
        homePage = new HomePage(driver);
    });

    it.only('testAddToFavoritesAndCheck', async function () {
      
        await driver.get('https://www.21vek.by/mobile/galaxya558gb256gbsma556elvccaulavendar_samsung_8883431.html');
        await homePage.waitSeconds(2);

        await homePage.clickAcceptButton();
        await homePage.waitSeconds(1);
        
        await productPage.clickAddToFavoritesButton();
        await homePage.waitSeconds(3);
        
        await homePage.clickAccountButton();
        await homePage.waitSeconds(1);
        await homePage.clickFavoritesButton();
        await homePage.waitSeconds(1);

        const expectedProductTitle = 'Смартфон Samsung Galaxy A55 8GB/256GB / SM-A556ELVCCAU (Lavendar)';
        const favoriteProductTitle = await driver.findElement(By.xpath("//*[@id='8883431']/div/div/div[1]/a")).getText();
        console.log("Название продукта в избранном:", favoriteProductTitle); 

        assert.strictEqual(favoriteProductTitle, expectedProductTitle);
    });

    after(async function () {
        await driver.quit();
    });
});
