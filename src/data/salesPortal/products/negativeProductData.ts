import { faker } from "@faker-js/faker";
import { STATUS_CODES } from "data/statusCodes";
import { MANUFACTURERS } from "./manufacturers";
import { ICreateProduct } from "data/types/product.types";

export const createNegativeProductCases: ICreateProduct[] =[
    {
        title: `2 characters in Name`,
        productData: ({name: faker.string.alphanumeric({length: 2})}),
        expectedStatus: STATUS_CODES.BAD_REQUEST
    },
     {
        title: `41 characters in Name`,
        productData: ({name: faker.string.alphanumeric({length: 41})}),
        expectedStatus: STATUS_CODES.BAD_REQUEST
    },
    {
        title: `empty name`,
        productData: ({name: ""}),
        expectedStatus: STATUS_CODES.BAD_REQUEST
    },
    {
        title: `special symbols in Name`,
        productData: ({name: faker.string.symbol({min:3, max:40})}),
        expectedStatus: STATUS_CODES.BAD_REQUEST
    },
     {
        title: `2 spaces in name`,
        productData: ({name: faker.string.alphanumeric({length: {min:2, max:10}}) + "  " +  faker.string.alphanumeric({length: {min:2, max:10}})}),
        expectedStatus: STATUS_CODES.BAD_REQUEST
    },
    {
        title: `no Manufacturer`,
        productData: ({manufacturer: "" as unknown as MANUFACTURERS}),
        expectedStatus: STATUS_CODES.BAD_REQUEST
    },
     {
        title: `price = 0`,
        productData:({price: 0}),
        expectedStatus: STATUS_CODES.BAD_REQUEST
    },
     {
        title: `price = 100000`,
        productData:({price: 100000}),
        expectedStatus: STATUS_CODES.BAD_REQUEST
    }, 
    {
        title: `negative price = -150`,
        productData:({amount: -150}),
        expectedStatus: STATUS_CODES.BAD_REQUEST
    },
    {
        title: `negative amount = -1`,
        productData:({amount: -1}),
        expectedStatus: STATUS_CODES.BAD_REQUEST
    },
    {
        title: `amount = 1000`,
        productData:({amount: 1000}),
        expectedStatus: STATUS_CODES.BAD_REQUEST
    },
    {
        title: `note with 251 characters`,
        productData:({notes: faker.string.alphanumeric({length:251})}),
        expectedStatus: STATUS_CODES.BAD_REQUEST
    },
    {
        title: `note with ">" character`,
        productData:({notes: faker.string.alphanumeric({length: {min:0, max:124}}) + ">" + faker.string.alphanumeric({length: {min:0, max:124}})}),
        expectedStatus: STATUS_CODES.BAD_REQUEST
    }, {
        title: `note with "<" character`,
        productData:({notes: faker.string.alphanumeric({length: {min:0, max:124}}) + "<" + faker.string.alphanumeric({length: {min:0, max:124}})}),
        expectedStatus: STATUS_CODES.BAD_REQUEST
    },
]