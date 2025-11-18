import { generateProductData } from "data/salesPortal/products/generateProductData";
import { createNegativeProductCases } from "data/salesPortal/products/negativeProductData";
import { IProduct } from "data/types/product.types";
import { test, expect } from "fixtures/api.fixture";
import _ from "lodash";
import { validateResponse } from "utils/validation/validateResponse.utils";

// Используя DDT подход, напишите тест сьют для проверки эндпоинта создания продукта:
//   - с негативыми проверками

test.describe("[API] [Sales Portal] [Products]", () => {

  let token = "";

    test.beforeEach(async ({loginApiService }) => {
        token = await loginApiService.loginAsAdmin();
    })

    for (const {title, productData, expectedStatus} of createNegativeProductCases) {

        test(`NOT create Product with ${title}`, async ({productsApi }) => {
            const productDataGenerated = generateProductData(productData);
            const createdProduct = await productsApi.create(productDataGenerated as IProduct, token);

            validateResponse(createdProduct, {
                  status: expectedStatus,
                  IsSuccess: false,
                  ErrorMessage: "Incorrect request body",
                });
        })

    }
})