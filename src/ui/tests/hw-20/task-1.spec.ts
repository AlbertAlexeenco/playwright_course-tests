// Разработать тест со следующими шагами:
//   - открыть https://the-internet.herokuapp.com/
//   - перейти на страницу Dynamic Controls
//   - Дождаться появления кнопки Remove
//   - Завалидировать текста в заголовке страницы
//   - Чекнуть чекбокс
//   - Кликнуть по кнопке Remove
//   - Дождаться исчезновения чекбокса
//   - Проверить наличие кнопки Add
//   - Завалидировать текст It's gone!
//   - Кликнуть на кнопку Add
//   - Дождаться появления чекбокса
//   - Завалидировать текст It's back!

import test, { expect } from "@playwright/test";

test.describe("[herokuapp][Dynamic controls]", () => {

     const url = "https://the-internet.herokuapp.com/";

    test("Validate actions from Dynamic Controls page", async ({ page }) => {

        const dynamicControlsBtn = page.locator(`[href="/dynamic_controls"]`);
        const pageTitle = page.locator("h4:first-child");
        const removeBtn = page.getByRole("button", { name: "Remove"});
        const checkbox = page.locator(`input[type="checkbox"]`);
        const loading = page.locator("form #loading");
        const addBtn = page.getByRole("button", { name: "Add"});
        const message = page.locator("p#message");

        await page.goto(url);
        await dynamicControlsBtn.click();
        await expect(removeBtn).toBeVisible();
        await expect(pageTitle).toHaveText("Dynamic Controls");
        await checkbox.click();
        await expect(checkbox).toBeChecked()
        await removeBtn.click();
        await expect(loading).toHaveText("Wait for it...");
        await expect(checkbox).toBeHidden({timeout: 10000});
        await expect(addBtn).toBeVisible();
        await expect(message).toHaveText("It's gone!");
        await addBtn.click();
        await expect(checkbox).toBeVisible();
        await expect(message).toHaveText("It's back!");
    })
})