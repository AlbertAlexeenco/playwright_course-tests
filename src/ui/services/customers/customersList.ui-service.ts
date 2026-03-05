import { Page } from "@playwright/test";
import { AddNewCustomerPage } from "ui/pages/customers/addNewCustomer.page";
import { CustomersListPage } from "ui/pages/customers/customersList.page";

export class CustomersListUIService{
    customersListPage: CustomersListPage;
    addNewCustomerPage: AddNewCustomerPage;

    constructor(private page: Page){
        this.customersListPage = new CustomersListPage(page);
        this.addNewCustomerPage = new AddNewCustomerPage(page);
    }

    async openAddNewCustomerPage() {
        await this.customersListPage.clickAddNewCustomer();
        await this.addNewCustomerPage.waitForOpened();
    }

    
}