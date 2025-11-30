import { HomePage } from "ui/pages/home.page";
import { generateMetricsResponseData } from "./generateMetricsData";
import numeral from "numeral";

export const mockedData = generateMetricsResponseData();

export const metricsData = [
    {
        title: `Orders This Year`,
        expectedField: mockedData.Metrics.orders.totalOrders.toString(),
        displayedMetricData: (page: HomePage) => page.ordersThisYear.innerText(),
    },
    {
        title: `New Customers`,
        expectedField: mockedData.Metrics.customers.totalNewCustomers.toString(),
        displayedMetricData: (page: HomePage) => page.newCustomers.innerText(),
    },
    {
        title: `Canceled Orders`,
        expectedField: mockedData.Metrics.orders.totalCanceledOrders.toString(),
        displayedMetricData: (page: HomePage) => page.canceledOrders.innerText(),
    },
    {
        title: `Total Revenue`,
        expectedField: numeral(mockedData.Metrics.orders.totalRevenue.toString()).format("$0.0a"),
        displayedMetricData: (page: HomePage) => page.totalRevenue.innerText(),
    },
    {
        title: `Average Order Value`,
        expectedField: numeral(mockedData.Metrics.orders.averageOrderValue.toString()).format("$0.0a"),
        displayedMetricData: (page: HomePage) => page.averageOrderValue.innerText(),
    },
]