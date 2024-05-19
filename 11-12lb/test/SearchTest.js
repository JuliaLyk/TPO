const { Builder, By } = require('selenium-webdriver');
const { expect } = require('chai'); 
const HomePage = require('../page/HomePage');
const SearchPage = require('../page/SearchPage');

describe('SearchTest', function() {
    let driver;
    let homePage;
    let searchPage;

    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
        homePage = new HomePage(driver);
        searchPage = new SearchPage(driver);
    });

    it('should search for a product', async function() {
        await driver.get('https://www.21vek.by/order');
        await homePage.waitSeconds(2);

        await homePage.clickAcceptButton();
        await homePage.waitSeconds(1);

        await homePage.enterSearchQuery('Samsung');
        await homePage.waitSeconds(1);

        const resultLink = await driver.findElement(By.css('.result__link'));
        const isDisplayed = await resultLink.isDisplayed();
        expect(isDisplayed).to.be.true;

        const resultProductName = await driver.findElement(By.css('.result__name')).getText();
        expect(resultProductName).to.include('Samsung');
    });

    after(async function() {
        await driver.quit();
    });
});
