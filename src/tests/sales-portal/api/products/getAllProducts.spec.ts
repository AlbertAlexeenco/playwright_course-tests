// Написать смоук API тест на получение всех продуктов (без фильтрационных параметров) со следующими шагами:
//   - Залогиниться
//   - Создать продукт и проверить 201й статус
//   - Получить все продукты
//   - создать и проверить схему
//   - проверить статус
//   - проверить, что в массиве тела респонса есть созданный продукт
//   - Проверить поля IsSuccess и ErrorMessage

import test, { expect } from "@playwright/test";
import { apiConfig } from "config/apiConfig";
import { credentials } from "config/env";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { allProductsSchema } from "data/schemas/products/getaAllProducts.schema";
import { STATUS_CODES } from "data/statusCodes";
import _ from "lodash";
import { validateResponse } from "utils/validateResponse.utils";


const { baseURL, endpoints } = apiConfig;

test.describe("[API] [Sales Portal] [Login]", () => {

  let id = "";
  let token = "";

    test.afterEach(async ({ request }) => {
        const response = await request.delete(`${baseURL}${endpoints.products}/${id}`, {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        expect(response.status()).toBe(STATUS_CODES.DELETED);
      });

  test("Get all products", async ({ request }) => {

    //login
    const loginResponse = await request.post(baseURL + endpoints.login, {
        data: credentials,
        headers: {
            "content-type": "application/json",
        },
    });

    const headers = loginResponse.headers();
    token = headers["authorization"]!;
    expect(token).toBeTruthy();

    //create product and check status
    const productData = generateProductData();
    const createProductResponse = await request.post(baseURL + endpoints.products, {
        data: productData,
        headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    expect.soft(createProductResponse.status()).toBe(STATUS_CODES.CREATED);

    const createProductBody = await createProductResponse.json();
    const actualProductData = createProductBody.Product;
    id = actualProductData._id;

    expect(_.omit(actualProductData, ["_id", "createdOn"])).toEqual(productData);
   
    // get all products
    const getAllProductsResponse = await request.get(baseURL + endpoints.productsAll, {
        headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
    },
    })

    //create & check schema, check status code
    const getAllPorductsBody = await getAllProductsResponse.json();
    await validateResponse(getAllProductsResponse,{
      status: STATUS_CODES.OK,
      schema: allProductsSchema,
      IsSuccess: true,
      ErrorMessage: null,    
    })

    //   - проверить, что в массиве тела респонса есть созданный продукт
    expect(getAllPorductsBody.Products).toContainEqual(createProductBody.Product);
  })
})