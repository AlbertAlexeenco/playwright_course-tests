import { expect, Page } from "@playwright/test";
import { toHash } from "ajv/dist/compile/util";
import { apiConfig } from "config/apiConfig";
import { log } from "console";
import { generateCustomerData } from "data/salesPortal/customers/generateCustomerData";
import { ICustomer, ICustomerResponse } from "data/types/customers.types";
import { STATUS_CODES } from "http";
import _ from "lodash";
import { AddNewCustomerPage } from "ui/pages/customers/addNewCustomer.page";
import { CustomersListPage } from "ui/pages/customers/customersList.page";
import { logStep } from "utils/report/logStep.utils";

export class AddNewCustomerUIService {
    addNewCustomerPage: AddNewCustomerPage;
    customersListPage: CustomersListPage;

    constructor(private page: Page) {
        this.addNewCustomerPage = new AddNewCustomerPage(page);
        this.customersListPage = new CustomersListPage(page);
    }

    @logStep("Open Add New Customer Page")
    async open(){
        this.addNewCustomerPage.open("customers/add");
        this.addNewCustomerPage.waitForOpened();
    }

    @logStep("Create new Customer via UI")
    async create(customerData?: Partial<ICustomer>){
        const data = generateCustomerData(customerData);
        await this.addNewCustomerPage.fillForm(data);
        const response = await this.addNewCustomerPage.interceptResponse<ICustomerResponse, any>(
                apiConfig.endpoints.customers,
                this.addNewCustomerPage.clickSave.bind(this.addNewCustomerPage)
            )

        expect(response.status).toBe(STATUS_CODES.CREATED);
        expect(_.omit(response.body.Customer, "_id", "createdOn")).toEqual(data);
    }
}