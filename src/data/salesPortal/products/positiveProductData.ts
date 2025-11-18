import { faker } from "@faker-js/faker";
import { STATUS_CODES } from "data/statusCodes";
import { ICreateProduct, IProduct } from "data/types/product.types";

export const createPositiveProductCases: ICreateProduct[] =[
    {
        title: `3 characters in Name`,
        productData: ({name: faker.string.alphanumeric({length: 3})}),
        expectedStatus: STATUS_CODES.CREATED
    },
     {
        title: `40 characters in Name`,
        productData: ({name: faker.string.alphanumeric({length: 40})}),
        expectedStatus: STATUS_CODES.CREATED
    },
     {
        title: `1 space in Name`,
        productData: ({name: faker.string.alphanumeric({length: {min:2, max:10}}) + " " +  faker.string.alphanumeric({length: {min:2, max:10}})}),
        expectedStatus: STATUS_CODES.CREATED
    },
     {
        title: `price = 1`,
        productData:({price: 1}),
        expectedStatus: STATUS_CODES.CREATED
    },
     {
        title: `price = 99999`,
        productData:({price: 99999}),
        expectedStatus: STATUS_CODES.CREATED
    },
    {
        title: `amount = 0`,
        productData:({amount: 0}),
        expectedStatus: STATUS_CODES.CREATED
    },
    {
        title: `amount = 999`,
        productData:({amount: 999}),
        expectedStatus: STATUS_CODES.CREATED
    },
    {
        title: `note with 0 characters`,
        productData:({notes: ""}),
        expectedStatus: STATUS_CODES.CREATED
    },
    {
        title: `note with 250 characters`,
        productData:({notes: faker.string.alphanumeric({length:250})}),
        expectedStatus: STATUS_CODES.CREATED
    },
]