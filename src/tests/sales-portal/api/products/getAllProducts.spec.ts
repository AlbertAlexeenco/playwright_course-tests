// Написать смоук API тест на получение всех продуктов (без фильтрационных параметров) со следующими шагами:
//   - Залогиниться
//   - Создать продукт и проверить 201й статус
//   - Получить все продукты
//   - создать и проверить схему
//   - проверить статус
//   - проверить, что в массиве тела респонса есть созданный продукт
//   - Проверить поля IsSuccess и ErrorMessage

import { test, expect } from "fixtures/api.fixture";
import { apiConfig } from "config/apiConfig"; 
import { allProductsSchema } from "data/schemas/products/getaAllProducts.schema";
import { STATUS_CODES } from "data/statusCodes";
import _ from "lodash";
import { validateResponse } from "utils/validation/validateResponse.utils";


const { baseURL, endpoints } = apiConfig;

test.describe("[API] [Sales Portal] [Login]", () => {

  let id = "";
  let token = "";

 test.afterEach(async ({ productsApiService }) => {
    if (id) await productsApiService.delete(token, id);
  });

  test("Get all products", async ({ loginApiService, productsApiService, productsApi }) => {

    //login
    token = await loginApiService.loginAsAdmin();

    //create product and check status
    const createdProduct = await productsApiService.create(token);
    id = createdProduct._id;

    // get all products
    const getAllProductsResponse = await productsApi.getAll(token);

    //create & check schema, check status code
    validateResponse(getAllProductsResponse,{
      status: STATUS_CODES.OK,
      schema: allProductsSchema,
      IsSuccess: true,
      ErrorMessage: null,    
    })

    //   - проверить, что в массиве тела респонса есть созданный продукт
    expect(getAllProductsResponse.body.Products).toContainEqual(createdProduct);

  })
})