// Создайте e2e тест со следующими шагами:
// 1. Зайти на сайт Sales Portal + 
// 2. Залогиниться с вашими кредами + 
// 3. Перейти на страницу Products List + 
// 4. Перейти на станицу Add New Product +
// 5. Создать продукта + 
// 6. Проверить наличие продукта в таблице +
// 7. Кликнуть на кнопку "Delete" в таблице для созданного продукта + 
// 8. В модалке удаления кликнуть кнопку Yes, Delete + 
// 9. Дождаться исчезновения модалки и загрузки страницы + 
// 10. Проверить, что продукт отсутствует в таблице

// Вам понадобится:

// - PageObject модалки удаления продукта
// - Подключить модалку в PageObject страницы Products
// - Использовать фикстуры

import { NOTIFICATIONS } from "data/salesPortal/notifications";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { TAGS } from "data/tags";
import { test, expect } from "fixtures/business.fixture"

test.describe("[Sales Portal] [Products]", async () => {

    test("Delete products from table",
        {
            tag: [TAGS.SMOKE, TAGS.PRODUCTS, TAGS.UI, TAGS.REGRESSION],
        },
        async ({ productsListUIService, homePage, productsListPage, addNewProductPage }) => {
    
    await productsListUIService.open();
    await productsListPage.clickAddNewProduct();
    
    await addNewProductPage.waitForOpened();
    const productData = generateProductData();
    await addNewProductPage.fillForm(productData);
    await addNewProductPage.clickSave();

    await productsListPage.waitForOpened();
    await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);
    await expect(productsListPage.tableRowByName(productData.name)).toBeVisible();
    await productsListPage.closeToastMessage();
    await productsListPage.deleteButton(productData.name).click();
    
    const { deleteModal } = productsListPage;
    await deleteModal.waitForOpened();
    await deleteModal.clickConfirm();
    await deleteModal.modalIsClosed();

    await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_DELETED);
    await productsListPage.closeToastMessage();
    await expect(productsListPage.tableRowByName(productData.name)).not.toBeVisible();

    })
})