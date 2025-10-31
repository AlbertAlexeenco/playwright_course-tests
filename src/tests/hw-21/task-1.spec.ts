// Создать тест сьют используя DDT подход с негативными тест-кейсами по регистрации на сайте
// https://anatoly-karpovich.github.io/demo-login-form/

// Требования:
// Страница регистрации:
//   Username: обязательное, от 3 до 40 символов включительно, запрещены префиксные/постфиксные пробелы, как и имя состоящее из одних пробелов
//   Password: обязательное, от 8 до 20 символов включительно, необходима хотя бы одна буква в верхнем и нижнем регистрах, пароль из одних пробелов запрещен

// Страница логина:
//   Username: обязательное
//   Password: обязательное

import test, { expect } from "@playwright/test";
import invalidTestData from "../hw-21/register.data";

test.describe("[anatoly-karpovich site][Demo Login Form] Registration form", () => {

    const url = "https://anatoly-karpovich.github.io/demo-login-form/";

    for (const {testName, credentials, errorMessage} of invalidTestData){
        
        test(testName, async ({page})=> {

            const loginForm = page.locator(".loginForm");
            const loginDialogTitle = loginForm.locator("#loginForm");
            const registerBtnFromLogin = loginForm.locator("#registerOnLogin");
            
            const registerForm = page.locator(".registerForm");
            const registerDialogTitle = registerForm.locator("#registerForm");
            const usernameInput = registerForm.locator("#userNameOnRegister");
            const passwordInput = registerForm.locator("#passwordOnRegister");
            const registerBtnFromRegister = registerForm.locator("#register");
            const notification = page.locator("#errorMessageOnRegister");

            await page.goto(url);
            await expect(loginDialogTitle).toHaveText("Login");
            await registerBtnFromLogin.click();

            await expect(registerDialogTitle).toHaveText("Registration");
            await usernameInput.fill(credentials.username)
            await passwordInput.fill(credentials.password)
            await registerBtnFromRegister.click();
            await expect(notification).toHaveText(errorMessage);
        })
    }
})
