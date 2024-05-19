const { By, until } = require('selenium-webdriver');

class LoginPage {
    constructor(driver) {
        this.driver = driver;
        this.loginButtonLocator = By.xpath("//button[@data-testid='loginButton']");
        this.accountButtonLocator = By.xpath("//button[@class='styles_userToolsToggler__c2aHe']");
        this.enterButtonLocator = By.xpath("//button[@class='Button-module__button userToolsBtn Button-module__blue-primary Button-module__small']");
        this.emailInputLocator = By.id("login-email");
        this.submitButtonLocator = By.xpath("//button[@data-testid='loginSubmit']");
        this.errorMessageLocator = By.xpath("//span[@class='ErrorMessage-module__message' and text()='Неправильный формат электронной почты']");
    }

    async clickAccountButton() {
        const accountButton = await this.driver.findElement(this.accountButtonLocator);
        await accountButton.click();
        console.info("Нажатие на кнопку 'Аккаунт'.");
    }

    async clickEnterButton() {
        const enterButton = await this.driver.findElement(this.enterButtonLocator);
        await enterButton.click();
        console.info("Нажатие на кнопку 'Войти'.");
    }

    async clickLoginButton() {
        const loginButton = await this.driver.findElement(this.loginButtonLocator);
        await loginButton.click();
        console.info("Нажатие на кнопку 'Войти'.");
    }

    async enterEmail(email) {
        const emailInput = await this.driver.findElement(this.emailInputLocator);
        await emailInput.clear();
        await emailInput.sendKeys(email);
        console.info(`Ввод электронной почты: '${email}'`);
    }

    async clickSubmitButton() {
        const submitButton = await this.driver.findElement(this.submitButtonLocator);
        await submitButton.click();
        console.info("Нажатие на кнопку 'Отправить'.");
    }

    async getErrorMessageText() {
        const errorMessage = await this.driver.findElement(this.errorMessageLocator);
        const errorMessageText = await errorMessage.getText();
        console.info(`Получено сообщение об ошибке: '${errorMessageText}'`);
        return errorMessageText;
    }
}

module.exports = LoginPage;
