const { By } = require('selenium-webdriver');

class SearchPage {
    constructor(driver) {
        this.driver = driver;
        this.foundProductLocator = By.css('.ProductItem_title__qJCTw span');
        this.productPriceLocator = By.xpath("//*[@id='j-result-page-1']/div/div/ul/li[1]/dl/dd/div/span[1]/span[2]");
        this.priceInputLocator = By.xpath("//input[@name='filter[price][from]']");
        this.showProductsButtonLocator = By.xpath("//button[@id='j-filter__btn']");
    }

    async getFoundProductText() {
        const foundProduct = await this.driver.findElement(this.foundProductLocator);
        const productText = await foundProduct.getText();
        console.log(`Текст найденного продукта: '${productText}'`);
        return productText;
    }

    async getFoundProductPrice() {
        const productPrice = await this.driver.findElement(this.productPriceLocator);
        const priceText = await productPrice.getAttribute('content');
        const productPriceValue = parseFloat(priceText);
        console.log(`Цена найденного продукта: '${productPriceValue}'`);
        return productPriceValue;
    }

    async enterPriceFilter(price) {
        const priceInput = await this.driver.findElement(this.priceInputLocator);
        await priceInput.clear();
        await priceInput.sendKeys(price);
        console.log(`Введено значение фильтра по цене: '${price}'`);
    }

    async clickShowProductsButton() {
        const showProductsButton = await this.driver.findElement(this.showProductsButtonLocator);
        await showProductsButton.click();
        console.log(`Нажата кнопка 'Показать товары'`);
    }
}

module.exports = SearchPage;
