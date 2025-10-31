// Разработать тест со следующими шагами:
//   - открыть https://anatoly-karpovich.github.io/demo-login-form/
//   - Засунуть в localStorage браузера данные test@gmail.com / SecretPw123!@# для логина на сайт
//   - Залогиниться с данными что вы вставили в localStorage
//   - Завалидировать успешный логин

//   Рекоммендации:
//   - Для доступа к localStorage используйте https://playwright.dev/docs/evaluating

import test, { expect } from "@playwright/test";

interface ICredentials {
    username: string;
    password: string;
}

test.describe("[anatoly-karpovich site] [Login form]", () => {

    const validCredentials: ICredentials = {
        username: "test@gmail.com",
        password: "SecretPw123!@#"
    }

    const url = "https://anatoly-karpovich.github.io/demo-login-form/";

    test("Login with credentials from localStorage", async ({ page })=>{
        
        const usernameInput = page.locator("#userName");
        const passwordInput = page.locator("#password");
        const submitBtn = page.locator("#submit");
        const successfullMessage = page.locator("#successMessage");
        
        await page.goto(url);
        await page.evaluate((credentials) => {
            localStorage.setItem(credentials.username, JSON.stringify({ name: credentials.username, password: credentials.password }));
        }, validCredentials);

        await usernameInput.fill(validCredentials.username);
        await passwordInput.fill(validCredentials.password);
        await submitBtn.click();
        await expect(successfullMessage).toHaveText(`Hello, ${validCredentials.username}!`);
        })
})
