import { Page } from "@playwright/test";
import { AddNewCustomerPage } from "ui/pages/customers/addNewCustomer.page";
import { CustomersListPage } from "ui/pages/customers/customersList.page";
import { logStep } from "utils/report/logStep.utils";

export class CustomersListUIService{
    customersListPage: CustomersListPage;
    addNewCustomerPage: AddNewCustomerPage;

    constructor(private page: Page){
        this.customersListPage = new CustomersListPage(page);
        this.addNewCustomerPage = new AddNewCustomerPage(page);
    } 

    @logStep("Open Customers List Page")
    async open(){
        await this.customersListPage.open("customers");
        await this.customersListPage.waitForOpened();
    }

    @logStep("Open Add New Customer Page")
    async openAddNewCustomerPage() {
        await this.customersListPage.clickAddNewCustomer();
        await this.addNewCustomerPage.waitForOpened();
    }

    
}