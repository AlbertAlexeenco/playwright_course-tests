

// Написать смоук API тест на логин
//   - создать и проверить схему
//   - проверить статус
//   - проверить наличие токена в хедерах

import { expect, test } from "fixtures/business.fixture";
import { apiConfig } from "config/apiConfig";
import { credentials } from "config/env";
import { loginSchema } from "data/schemas/login/login.schema";
import { STATUS_CODES } from "data/statusCodes";
import { TAGS } from "data/tags";
import { validateResponse } from "utils/validation/validateResponse.utils";

const { baseURL, endpoints } = apiConfig;

test.describe("[API] [Sales Portal] [Login]", () => {

  test("SignIn with valid credentials via API",
    {
      tag: [TAGS.SMOKE, TAGS.API, TAGS.REGRESSION],
    },
     async ({ loginApi }) => {
      const loginResponse = await loginApi.login(credentials);

    const headers = loginResponse.headers;
    const token = headers["authorization"]!;
    expect(token).toBeTruthy();

    validateResponse(loginResponse, {
        status: STATUS_CODES.OK,
        schema: loginSchema,
        IsSuccess: true,
        ErrorMessage: null,
    });
  })
})