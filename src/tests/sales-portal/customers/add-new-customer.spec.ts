import { apiConfig } from "config/apiConfig";
import { generateCustomerData } from "data/salesPortal/customers/generateCustomerData";
import { NOTIFICATIONS } from "data/salesPortal/notifications";
import { STATUS_CODES } from "data/statusCodes";
import { ICustomerResponse } from "data/types/customers.types";
import { expect, test } from "fixtures"
import _ from "lodash";
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

    test("Add new Customer", async ({loginUIService, homeUIService, customersListPage, customersListUIService, addNewCustomerPage, page})  => {
        //   - залогиниться
        token = await loginUIService.loginAsAdmin();
        
        //   - Перейти на страницу Customers List
        await homeUIService.openModule("Customers");

        //   - Перейти на страницу Add New Customer
        await customersListUIService.openAddNewCustomerPage();
    
        //   - Заполнить поля валидными данными
        const createdCustomer = generateCustomerData();
        console.log(id);
        await addNewCustomerPage.fillForm(createdCustomer);

        //   - Сохранить покупателя
        const response = await addNewCustomerPage.interceptResponse<ICustomerResponse, any>(
            apiConfig.endpoints.customers,
            addNewCustomerPage.clickSave.bind(addNewCustomerPage)
        )
        expect(response.status).toBe(STATUS_CODES.CREATED);
            expect(_.omit(response.body.Customer, "_id", "createdOn")).toEqual(createdCustomer);

        id = response.body.Customer._id;

        //   - Проверить наличие покупателя в таблице
        await customersListPage.waitForOpened();
        await expect(customersListPage.toastMessage).toContainText(NOTIFICATIONS.CUSTOMER_CREATED);
        const result = await customersListPage.getFirstRowCustomer();        

        //   Требования найдете в валидационных сообщениях на фронте:) 
        // Уникальное поле - Email
        
    })
})