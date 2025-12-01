import { ICreatedOn, ID, IResponseFields } from "./core.types"
import { ICustomer, ICustomers } from "./customers.types"


export interface IMetrics {
    orders: IOrders,
    customers: ICustomers,
    products: IProducts,
}

export interface IOrders {
    totalRevenue: number,
    totalOrders: number,
    averageOrderValue: number,
    totalCanceledOrders: number,
    recentOrders: IOrder[],
    ordersCountPerDay: IOrderCountPerDay[],
}

export interface IOrder extends ICreatedOn, ID {
    status: string,
    customer: ICustomer,
    products: object,
    total_price: number,
    delivery: object,
    example: object,
    comments: object,
    history: object
}

export interface IDate {
    year: number,
    month: 	number,
    day: number,
}

export interface IOrderCountPerDay {
    date: IDate,
    count: number,
}

export interface ICustomerGrowth extends IOrderCountPerDay {}

export interface IProducts {
    topProducts: IBestSellingProducts[],
}

export interface IBestSellingProducts {
    name: string,
    sales: number,
}

export interface IMetricsResponse extends IResponseFields{
    Metrics: IMetrics,
}