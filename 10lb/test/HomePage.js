const { By, Key } = require('selenium-webdriver');

class HomePage {
    constructor(driver) {
        this.driver = driver;
        this.acceptButtonLocator = By.xpath("//div[@class='Button-module__buttonText' and text()='Принять']");
        this.basketButtonLocator = By.css('.g-basketbtn.j-button-clicked');
        this.searchInputLocator = By.id('catalogSearch');
        this.errorNumberLocator = By.css('.error__number');
        this.errorHeadingLocator = By.css('.ErrorViewWrapper_heading__jIxEN');
    }
    
    async waitSeconds(seconds) {
        return new Promise(resolve => setTimeout(resolve, seconds * 1000));
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
        console.log('Ввели ' + query);
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
}

module.exports = HomePage;