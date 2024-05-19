const { By, Key } = require('selenium-webdriver');

class BasketPage {
    constructor(driver) {
        this.driver = driver;
    }

    async getProductTitle() {
        const productTitle = await this.driver.findElement(By.css(".BasketItem_titleWrapper__ytawc a.BasketItem_title__MzCQ9"));
        return await productTitle.getText();
    }

    async getPromocodeErrorMessage() {
        const promocodeErrorMessage = await this.driver.findElement(By.xpath("//span[@class='ErrorMessage-module__message']"));
        return await promocodeErrorMessage.getText();
    }

    async enterPromocodeQuery(query) {
        const promocodeInput = await this.driver.findElement(By.xpath("//input[@class='BaseInput-module__input']"));
        await promocodeInput.clear();
        await promocodeInput.sendKeys(query, Key.ENTER);
    }

    async clickIncreaseQuantityButton() {
        const increaseQuantityButton = await this.driver.findElement(By.xpath("//button[@aria-label='Увеличение количества']"));
        const quantityInput = await this.driver.findElement(By.css("input.Counter_counterInput__idJlc"));
        const count_a = parseInt(await quantityInput.getAttribute("value"));
        await increaseQuantityButton.click();
        const count_b = parseInt(await quantityInput.getAttribute("value"));

        return count_b > count_a;
    }

    async emptyBasketCheck() {
        const emptyBasketText = await this.driver.findElement(By.xpath("//*[@id='content']/div[3]/div/div/p"));
        return await emptyBasketText.getText();
    }
}

module.exports = BasketPage;
