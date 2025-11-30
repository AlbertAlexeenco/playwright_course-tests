import { faker } from "@faker-js/faker";
import { apiConfig } from "config/apiConfig";
import { generateMetricsData, generateMetricsResponseData } from "data/salesPortal/home/generateMetricsData";
import { metricsData, mockedData } from "data/salesPortal/home/metricsData";
import { STATUS_CODES } from "data/statusCodes";
import { test, expect } from "fixtures/business.fixture";
import { HomePage } from "ui/pages/home.page";


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

    test.beforeEach(async ({loginAsAdmin, mock }) => {
           await mock.metricsHomePage(mockedData);
            await loginAsAdmin();
    })
    
    for(const {title, expectedField, displayedMetricData } of metricsData ) {
        
        test(`Check ${title} metric`, async ({homePage}) => {
            expect.soft(await displayedMetricData(homePage)).toEqual(expectedField);
        })
    }    
})
