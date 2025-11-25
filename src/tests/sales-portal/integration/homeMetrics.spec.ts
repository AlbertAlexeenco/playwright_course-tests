import { apiConfig } from "config/apiConfig";
import { generateMetricsResponseData } from "data/salesPortal/home/generateMetricsData";
import { STATUS_CODES } from "data/statusCodes";
import { test, expect } from "fixtures/business.fixture";


// Создайте 3 интеграционных теста для проверки следующих метрик на странице Home:
// 1. Orders This Year
// 2. New Customers
// 3. Canceled Orders

// Для реализации подмокивайте респонс эндпоинта metrics

//   - Orders This Year: Metrics.orders.totalOrders
//   - New Customers: Metrics.customers.totalNewCustomers
//   - Canceled Orders: Metrics.orders.totalCanceledOrders

// Остальной объект оставьте как есть сейчас в респонсе, замените просто на ваши данные в метриках нужных``

test.describe("[Integration] [Sales Portal] [Home Metrics]", () => {

    // test.beforeEach(async ({ loginAsAdmin }) => {
      
    // });

    test("Check Orders This Year", async ({loginAsAdmin, productsListPage, page, mock }) => {
        const expectedMetricsResponse = generateMetricsResponseData({
            orders: {
                totalRevenue: 0,
                totalOrders: 0,
                averageOrderValue: 0,
                totalCanceledOrders: 0,
                recentOrders: [],
                ordersCountPerDay: []
         }
});
        await mock.metricsHomePage(expectedMetricsResponse);

        await loginAsAdmin();
    })
})