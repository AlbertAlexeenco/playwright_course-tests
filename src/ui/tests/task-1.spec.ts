import test, { expect } from "@playwright/test";
import { PassThrough } from "stream";

//   Разработайте смоук тест-сьют с тестами на REGISTER на странице https://anatoly-karpovich.github.io/demo-login-form/
//   Требования:
//     Страница регистрации:
//       Username: обязательное, от 3 до 40 символов включительно, запрещены префиксные/постфиксные пробелы, как и имя состоящее из одних пробелов
//       Password: обязательное, от 8 до 20 символов включительно, необходима хотя бы одна буква в верхнем и нижнем регистрах, пароль из одних пробелов запрещен
//     Страница логина:
//       Username: обязательное
//       Password: обязательное

interface ICredentials {
    username: string;
    password: string;
}

enum NOTIFICATIONS  {
    REGISTER_SUCCESS = "Successfully registered! Please, click Back to return on login page",
    REGISTER_FAIL_NO_VALID_DATA = "Please, provide valid data",
    REGISTER_FAIL_USERNAME_NOT_3_CHAR =  "Username should contain at least 3 characters",
    REGISTER_FAIL_USERNAME = "Prefix and postfix spaces are not allowed is username",
    REGISTER_FAIL_PASSWORD_NOT_8_CHAR = "Password should contain at least 8 characters",
    REGISTER_FAIL_PASSWORD_NO_LOWERCASE_CHAR = "Password should contain at least one character in lower case",
}

test.describe("[anatoly-karpovich] [Register form]", () => {

    const validCredentials: ICredentials = {
        username: "Alick",
        password: "123456Aa"
    }

    const invalidCredentials: ICredentials[] = [{
        username: "al",
        password: validCredentials.password
    },
    {
        username: "Alick1",
        password: "2122121212"
    },
    {
        username: "Alick2",
        password: "123"
    }]

    test.beforeEach(async ({ page }) => {

        const url = "https://anatoly-karpovich.github.io/demo-login-form/";
        const registerBtnFromLogin = page.locator("#registerOnLogin");
        const loginDialogTitle = page.locator("#loginForm");
        const registerDialogTitle = page.locator("#registerForm");

        await page.goto(url);
        await expect(loginDialogTitle).toHaveText("Login");
        await registerBtnFromLogin.click();
        await expect(registerDialogTitle).toHaveText("Registration");
    })

    test("Submit registration form with valid credentials", async ({ page })=>{

        const usernameInput = page.locator("#userNameOnRegister");
        const passwordInput = page.locator("#passwordOnRegister");
        const registerBtnFromRegister = page.locator("#register");
        const notification = page.locator("#errorMessageOnRegister");

        await usernameInput.fill("pizdaball");
        // await usernameInput.fill(validCredentials.username)
        await passwordInput.fill("xhakhxk45646A");
        // await usernameInput.fill(validCredentials.password)

        await registerBtnFromRegister.click();
        await expect(notification).toHaveText(NOTIFICATIONS.REGISTER_SUCCESS);
    });

    test("Submit registration with incorrect username", async ({ page })=>{
 
        const usernameInput = page.locator("#userNameOnRegister");
        const passwordInput = page.locator("#passwordOnRegister");
        const registerBtnFromRegister = page.locator("#register");
        const notification = page.locator("#errorMessageOnRegister");
        const { username, password } = invalidCredentials[0];

        await usernameInput.fill(username);
        await passwordInput.fill(password);

        await registerBtnFromRegister.click();
        await expect(notification).toHaveText(NOTIFICATIONS.REGISTER_FAIL_USERNAME_NOT_3_CHAR);
    });

    test("Submit registration with incorrect password, no lowercase characters", async ({ page })=>{
 
        const usernameInput = page.locator("#userNameOnRegister");
        const passwordInput = page.locator("#passwordOnRegister");
        const registerBtnFromRegister = page.locator("#register");
        const notification = page.locator("#errorMessageOnRegister");
        const { username, password } = invalidCredentials[1];

        await usernameInput.fill(username);
        await passwordInput.fill(password);

        await registerBtnFromRegister.click();
        await expect(notification).toHaveText(NOTIFICATIONS.REGISTER_FAIL_PASSWORD_NO_LOWERCASE_CHAR);
    });

    test("Submit registration with incorrect password, less than 8 characters", async ({ page })=>{
 
        const usernameInput = page.locator("#userNameOnRegister");
        const passwordInput = page.locator("#passwordOnRegister");
        const registerBtnFromRegister = page.locator("#register");
        const notification = page.locator("#errorMessageOnRegister");
        const { username, password } = invalidCredentials[2];

        await usernameInput.fill(username);
        await passwordInput.fill(password);

        await registerBtnFromRegister.click();
        await expect(notification).toHaveText(NOTIFICATIONS.REGISTER_FAIL_PASSWORD_NOT_8_CHAR);
    });
})
