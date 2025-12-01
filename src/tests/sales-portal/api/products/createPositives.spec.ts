import { generateProductData } from "data/salesPortal/products/generateProductData";
import { createPositiveProductCases } from "data/salesPortal/products/positiveProductData";
import { createProductSchema } from "data/schemas/products/create.schema";
import { TAGS } from "data/tags";
import { IProduct } from "data/types/product.types";
import { test, expect } from "fixtures/api.fixture";
import _ from "lodash";
import { validateResponse } from "utils/validation/validateResponse.utils";

// Используя DDT подход, напишите тест сьют для проверки эндпоинта создания продукта:
//   - с позитивными проверками

//   Используйте LoginApiService, ProductsApi, после каждого теста, где создастся продукт - удаляйте его.

//   Требования:
//   Name: обязательное, уникальное, Products's name should contain only 3-40 alphanumerical characters and one space between
//   Manufacturer: обязательное
//   Price: обязательное, Price should be in range 1-99999
//   Amount: обязательное, Amount should be in range 0-999
//   Notes: Notes should be in range 0-250 and without < or > symbols

test.describe("[API] [Sales Portal] [Products]", () => {

  let id = "";
  let token = "";

    test.beforeEach(async ({loginApiService }) => {
        token = await loginApiService.loginAsAdmin();
    })

    test.afterEach(async ({ productsApiService }) => {
        if (id) await productsApiService.delete(token, id);
    });

    for (const {title, productData, expectedStatus} of createPositiveProductCases) {

        test(`Create Product with ${title}`,
        {
        tag: [TAGS.PRODUCTS, TAGS.REGRESSION, TAGS.API],
        },
        async ({productsApi }) => {
            const productDataGenerated = generateProductData(productData);
            const createdProduct = await productsApi.create(productDataGenerated as IProduct, token);

            validateResponse(createdProduct, {
                    status: expectedStatus,
                    schema: createProductSchema,
                    IsSuccess: true,
                    ErrorMessage: null,
                });
            
            id = createdProduct.body.Product._id;
            expect(_.omit(createdProduct.body.Product, ["_id", "createdOn"])).toEqual(productDataGenerated);
        })

    }
})