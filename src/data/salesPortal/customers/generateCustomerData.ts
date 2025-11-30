import { faker } from "@faker-js/faker";
import { ICustomer } from "data/types/customers.types";
import { COUNTRIES } from "./countries";
import { getRandomEnumValue } from "utils/enum.utils";

export function generateCustomerData(params?: Partial<ICustomer>):ICustomer{
    return {
        email: faker.internet.email() ,
        name: faker.person.fullName() ,
        country: getRandomEnumValue(COUNTRIES),
        city: faker.location.city(),
        street: faker.location.street(),
        house: faker.number.int({ min: 1, max: 199 }),
        flat: faker.number.int({ min: 1, max: 9 }),
        phone: "+" + faker.string.numeric({length: 10   }),
        notes: faker.string.alphanumeric({ length: 250 }),
        ...params,
    }
}