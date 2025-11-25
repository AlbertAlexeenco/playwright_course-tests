import { IMetrics, IMetricsResponse } from "data/types/metrics.types";
import { faker } from "@faker-js/faker";



export function generateMetricsData(params?: Partial<IMetrics>): IMetrics{
    return{
        orders: {
            totalRevenue: faker.number.int({ min: 1, max: 1000000 }),
            totalOrders: faker.number.int({ min: 1, max: 10000 }),
            averageOrderValue: faker.number.int({ min: 1, max: 99999 }),
            totalCanceledOrders: faker.number.int({ min: 1, max: 1000 }),
            recentOrders: [],
            ordersCountPerDay: [],
        },
        customers: {
            totalNewCustomers: faker.number.int({ min: 1, max: 1000 }) ,
            topCustomers: [],
            customerGrowth: [],

        },
        products: {
            topProducts: [],
        },
        ...params,
    };
}

export function generateMetricsResponseData(params?:  Partial<IMetrics>): IMetricsResponse {
  const mockData = generateMetricsData(params);
  return {
    Metrics: mockData,
    IsSuccess: true,
    ErrorMessage: null,
    ...params
  };
}
