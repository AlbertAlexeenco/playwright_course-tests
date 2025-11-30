import { generateCustomerData } from "data/salesPortal/customers/generateCustomerData";
import { NOTIFICATIONS } from "data/salesPortal/notifications";
import { expect, test } from "fixtures"
import { AddNewCustomerPage } from "ui/pages/customers/addNewCustomer.page";

// Реализовать E2E тест по созданию покупателя (модуль Customers) по аналогии c Products с шагами
//   - залогиниться
//   - Перейти на страницу Customers List
//   - Перейти на страницу Add New Customer
//   - Заполнить поля валидными данными
//   - Сохранить покупателя
//   - Проверить наличие покупателя в таблице
// - Удалить покупателя через API

//   Требования найдете в валидационных сообщениях на фронте:) 
// Уникальное поле - Email

test.describe("[Sales Portal] [Customers]", async() => {

    let id = "";
    let token = "";

    test.afterEach(async ({ customersApiService }) => {
        if (id) await customersApiService.delete(token, id);
        id = "";
      });

    test("Add new Customer", async ({loginUIService, homeUIService, customersListPage, addNewCustomerPage, page})  => {
        //   - залогиниться
        token = await loginUIService.loginAsAdmin();
        
        //   - Перейти на страницу Customers List
        await homeUIService.openModule("Customers");

        //   - Перейти на страницу Add New Customer
        await customersListPage.clickAddNewCustomer();
        await addNewCustomerPage.waitForOpened();

        //   - Заполнить поля валидными данными
        const createdCustomer = generateCustomerData();
        await addNewCustomerPage.fillForm(createdCustomer);

        //   - Сохранить покупателя
        await addNewCustomerPage.clickSave();

        //   - Проверить наличие покупателя в таблице
        await customersListPage.waitForOpened();
        await expect(customersListPage.toastMessage).toContainText(NOTIFICATIONS.CUSTOMER_CREATED);
        const result = await customersListPage.getFirstRowCustomer()

        // - Удалить покупателя через API
        // in after each

        //   Требования найдете в валидационных сообщениях на фронте:) 
        // Уникальное поле - Email
        
    })
})