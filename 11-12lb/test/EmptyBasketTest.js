const { Builder } = require('selenium-webdriver');
const assert = require('assert');
const BasketPage = require('../page/BasketPage');
const HomePage = require('../page/HomePage');//

describe('EmptyBasketTest', function () {
    let driver;
    let basketPage;
    let homePage;//

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
        basketPage = new BasketPage(driver);
        homePage = new HomePage(driver);//
    });

    it('testEmptyBasket', async function () {
        await driver.get('https://www.21vek.by/order/');
        await homePage.waitSeconds(2);//
        await homePage.clickAcceptButton(); 
        await homePage.waitSeconds(3);//
        const emptyBasketText = await basketPage.emptyBasketCheck();
        await homePage.waitSeconds(3);//
        assert.strictEqual(emptyBasketText, 'Вы можете выбрать товары в каталоге или воспользоваться поиском.');
        //Вы можете выбрать товары в каталоге, воспользоваться поиском или обратить внимание на просмотренные товары ниже.
    });

    after(async function () {
        await driver.quit();
    });
});
