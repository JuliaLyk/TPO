const { By, until } = require('selenium-webdriver');

class ProductPage {
    constructor(driver) {
        this.driver = driver;
        this.addToCompareButtonLocator = By.xpath("//a[@class='compare__link g-pseudo_href j-compare']");
        this.compareButtonLocator = By.xpath("//a[@class='compare__link cr-compare__result j-compare_result']");
        this.addToBasketButtonLocator = By.xpath("//button[@class='g-button g-buybtn item__buybtn cr-buybtn__in j-ga_track']");
        this.checkBasketButtonLocator = By.xpath("//a[@class='j-button-clicked g-basketbtn']");
        this.getProductTitleLocator = By.xpath("//h1[@itemprop='name']");
        this.addToFavoritesLocator = By.xpath("//*[@id='favoriteOldProductCard']");
        this.checkFavoritesButtonLocator = By.xpath("//button[contains(@class, 'favorites-button')]");
   }

    async clickAddToCompareButton() {
        console.log("Нажатие на кнопку 'Добавить к сравнению'.");
        const addToCompareButton = await this.driver.findElement(this.addToCompareButtonLocator);
        await addToCompareButton.click();
    }

    async clickCompareButton() {
        console.log("Нажатие на кнопку 'Сравнить'.");
        const compareButton = await this.driver.findElement(this.compareButtonLocator);
        await compareButton.click();
    }

    async checkBasketButton() {
        console.log("Проверка текста на кнопке корзины.");
        const checkBasketButton = await this.driver.findElement(this.checkBasketButtonLocator);
        return await checkBasketButton.getText();
    }

    async clickAddToBasketButton() {
        console.log("Нажатие на кнопку 'Добавить в корзину'.");
        const addToBasketButton = await this.driver.findElement(this.addToBasketButtonLocator);
        await addToBasketButton.click();
    }

    async clickAddToFavoritesButton() {
        const addToFavoritesButton = await this.driver.findElement(this.addToFavoritesLocator);
        await addToFavoritesButton.click();
    }

    async checkFavoritesButton() {
        const favoritesButton = await this.driver.findElement(this.checkFavoritesButtonLocator);
        return await favoritesButton.getText();
    }

    async getProductTitleText() {
        const productTitleElement = await this.driver.findElement(this.getProductTitleLocator);
        return await productTitleElement.getText();
    }
    
   
}

module.exports = ProductPage;
