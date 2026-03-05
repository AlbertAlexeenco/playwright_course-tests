import { ICreatedOn, ID, IResponseFields } from "./core.types";
import { ICustomerGrowth } from "./metrics.types";

export interface ICustomers {
    totalNewCustomers: number,
    topCustomers: ITopCustomers[],
    customerGrowth: ICustomerGrowth[],
}

export interface ICustomer{
    email: string,
    name: string,
    country: string,
    city: string,
    street: string,
    house: number,
    flat: number,
    phone: string,
    notes: string,
}

export interface ITopCustomers {
    customerName: string,
    customerEmail: string,
    totalSpent: number,
    ordersCount: number,
}

export interface ICustomerFromTable{
    email: string,
    name: string;
    country: string,
}

export interface ICustomerFromResponse extends Required<ICustomer>, ICreatedOn, ID {}

export interface ICustomerResponse extends IResponseFields {
    Customer: ICustomerFromResponse;
}

export interface ICustomerInTable extends ICustomerFromTable, ICreatedOn {}

export type CustomersTableHeader = "Email" | "Name" | "Country" | "Created On";