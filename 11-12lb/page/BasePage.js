const { By } = require('selenium-webdriver');

class BasePage {
    constructor(driver) {
        this.driver = driver;
    }

    async clickAcceptButton() {
        const acceptButton = await this.driver.findElement(By.xpath("//button[@class='Button-module__button Button-module__blue-primary']"));
        await acceptButton.click();
    }

    async waitSeconds(seconds) {
        await new Promise(resolve => setTimeout(resolve, seconds * 1000));
    }
}

module.exports = BasePage;
