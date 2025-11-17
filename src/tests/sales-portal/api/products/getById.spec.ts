import { test, expect } from "fixtures/api.fixture";
import { apiConfig } from "config/apiConfig";
import { getProductSchema } from "data/schemas/products/get.schema";
import { STATUS_CODES } from "data/statusCodes";
import _ from "lodash";
import { validateResponse } from "utils/validation/validateResponse.utils";


const { baseURL, endpoints } = apiConfig;

test.describe("[API] [Sales Portal] [Products]", () => {
  let id = "";
  let token = "";

  test.afterEach(async ({ productsApiService }) => {
    await productsApiService.delete(token, id);
  });

  test("Get Product By Id", async ({ loginApiService, productsApiService, productsApi }) => {
    //TODO: Preconditions

    token = await loginApiService.loginAsAdmin();
    const product = await productsApiService.create(token);
    id = product._id;

    //TODO: Action

    const getProductResponse = await productsApi.getById(id, token);
    validateResponse(getProductResponse, {
      status: STATUS_CODES.OK,
      schema: getProductSchema,
      IsSuccess: true,
      ErrorMessage: null,
    });

    //TODO: Assert
    expect(getProductResponse.body.Product).toEqual(product);
  });
});



//   test.afterEach(async ({ request }) => {
//     const response = await request.delete(`${baseURL}${endpoints.productById(id)}`, {
//       headers: {
//         "content-type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     expect(response.status()).toBe(STATUS_CODES.DELETED);
//   });

//   test("Get Product By Id", async ({ request }) => {
//     //TODO: Preconditions
//     const loginResponse = await request.post(baseURL + endpoints.login, {
//       data: credentials,
//       headers: {
//         "content-type": "application/json",
//       },
//     });
//     const loginBody = await loginResponse.json();
//     expect.soft(loginResponse.status()).toBe(STATUS_CODES.OK);
//     expect.soft(loginBody.IsSuccess).toBe(true);
//     expect.soft(loginBody.ErrorMessage).toBe(null);
//     expect.soft(loginBody.User.username).toBe(credentials.username);

//     const headers = loginResponse.headers();
//     token = headers["authorization"]!;
//     expect(token).toBeTruthy();

//     const productData = generateProductData();
//     const createProductResponse = await request.post(baseURL + endpoints.products, {
//       data: productData,
//       headers: {
//         "content-type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     const createProductBody = await createProductResponse.json();
//     await validateResponse(createProductResponse, {
//       status: STATUS_CODES.CREATED,
//       schema: createProductSchema,
//       IsSuccess: true,
//       ErrorMessage: null,
//     });

//     const actualProductData = createProductBody.Product;

//     expect(_.omit(actualProductData, ["_id", "createdOn"])).toEqual(productData);

//     id = actualProductData._id;

//     //TODO: Action

//     const getProductResponse = await request.get(`${baseURL}${endpoints.productById(actualProductData._id)}`, {
//       headers: {
//         "content-type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     const getProductBody = await getProductResponse.json();
//     await validateResponse(getProductResponse, {
//       status: STATUS_CODES.OK,
//       schema: getProductSchema,
//       IsSuccess: true,
//       ErrorMessage: null,
//     });
//     expect(_.omit(getProductBody.Product, ["_id", "createdOn"])).toEqual(productData);
//   });