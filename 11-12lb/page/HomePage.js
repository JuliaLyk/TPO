const { By, Key, until } = require('selenium-webdriver');

class HomePage {
    constructor(driver) {
        this.driver = driver;
        this.acceptButtonLocator = By.xpath("//div[@class='Button-module__buttonText' and text()='Принять']");
        this.basketButtonLocator = By.css('.g-basketbtn.j-button-clicked');
        this.searchInputLocator = By.id('catalogSearch');
        this.errorNumberLocator = By.css('.error__number');
        this.geographyButtonLocator = By.xpath("//button[@class='styles_localityBtn__qrGFQ']");
        this.geographyInputLocator = By.xpath("//input[@class='select__input']");
        this.geoSubmitLocator = By.xpath("//button[@class='Button-module__buttonText']");
        this.geoErrorLocator = By.xpath("//span[@class='ErrorMessage-module__message']");
        this.errorHeadingLocator = By.css('.ErrorViewWrapper_heading__jIxEN');
        this.accountLocator = By.xpath("//*[@id='header']/div/div[3]/div/div[3]/div/div/div/button");
        this.favoritesLocator = By.xpath("//*[@id='userToolsDropDown']/div/div[2]/div[1]/div[2]/a/div");
    
        ////*[@id="userToolsDropDown"]/div/div[2]/div[1]/div[2]/a/div
    }
    
    async waitSeconds(seconds) {
        return new Promise(resolve => setTimeout(resolve, seconds * 1000));
    }
    async clickBasketButton() {
        console.log('Нажатие на кнопку корзины.');
        const basketButton = await this.driver.findElement(this.basketButtonLocator);
        await basketButton.click();
    }
    async clickAcceptButton() {
        const acceptButton = await this.driver.findElement(this.acceptButtonLocator);
        await acceptButton.click();
    }

    async enterSearchQuery(query) {
        console.log('Ввод запроса поиска: ' + query);
        const searchInput = await this.driver.findElement(this.searchInputLocator);
        await searchInput.clear();
        await searchInput.sendKeys(query);
        await searchInput.sendKeys(Key.ENTER);
    }

    async getErrorNumber() {
        console.log('Получение номера ошибки.');
        const errorNumber = await this.driver.findElement(this.errorNumberLocator);
        return await errorNumber.getText();
    }

    async getErrorHeading() {
        console.log('Получение заголовка ошибки.');
        const errorHeading = await this.driver.findElement(this.errorHeadingLocator);
        return await errorHeading.getText();
    }

    async clickGeoButton() {
        console.log('Нажатие на кнопку географии.');
        const geographyButton = await this.driver.findElement(this.geographyButtonLocator);
        await geographyButton.click();
    }

    async inputGeo(input) {
        console.log('Ввод значения географии: ' + input);
        const geographyInput = await this.driver.findElement(this.geographyInputLocator);
        await geographyInput.clear();
        await geographyInput.sendKeys(input);
        await geographyInput.sendKeys(Key.ENTER);
    }

    async getGeoError() {
        console.log('Получение ошибки географии.');
        const geoError = await this.driver.findElement(this.geoErrorLocator);
        return await geoError.getText();
    }
 
    async clickAccountButton() {
        const accountButton = await this.driver.findElement(this.accountLocator);
        await accountButton.click();
    }

    async clickFavoritesButton() {
        const favoritesButton = await this.driver.findElement(this.favoritesLocator);
        await favoritesButton.click();
    }
}

module.exports = HomePage;
