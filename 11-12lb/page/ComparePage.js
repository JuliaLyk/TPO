const { By, until } = require('selenium-webdriver');

class ComparePage {
    constructor(driver) {
        this.driver = driver;
        this.productBlockLocator = By.xpath("//a[@class='mindbox-pr-view']");
    }

    async isProductPresent(productName) {
        const xpathExpression = `//a[contains(@class, 'mindbox-pr-view') and contains(text(), '${productName}')]`;
        const isPresent = await this.isElementPresent(By.xpath(xpathExpression));

        if (isPresent) {
            console.info(`Продукт '${productName}' присутствует на странице сравнения.`);
        } else {
            console.info(`Продукт '${productName}' отсутствует на странице сравнения.`);
        }

        return isPresent;
    }

    async isElementPresent(locator) {
        try {
            await this.driver.findElement(locator);
            return true;
        } catch (error) {
            if (error.name === 'NoSuchElementError') {
                return false;
            } else {
                throw error;
            }
        }
    }
}

module.exports = ComparePage;
