const { Builder } = require('selenium-webdriver');
const assert = require('assert');
const HomePage = require('../page/HomePage');
const SearchPage = require('../page/SearchPage');

describe('CategorySearchTest', function () {
    let driver;
    let homePage;
    let searchPage;
    

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
        homePage = new HomePage(driver);
        searchPage = new SearchPage(driver);
       
    });

    it('testCategorySearch', async function () {
      
        await driver.get('https://www.21vek.by/order/');
        await homePage.waitSeconds(3);
        await homePage.clickAcceptButton();
        
        await homePage.enterSearchQuery('Смартфон');
        await homePage.waitSeconds(5);
        const price = 7587;
        await searchPage.enterPriceFilter(price.toString());
        await homePage.waitSeconds(1);
        await searchPage.clickShowProductsButton();
        await homePage.waitSeconds(5);
        assert.ok(await searchPage.getFoundProductPrice() >= price);
    });

    after(async function () {
        await driver.quit();
    });
});
