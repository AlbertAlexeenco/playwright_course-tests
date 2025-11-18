
import { MANUFACTURERS } from "data/salesPortal/products/manufacturers";
import { ICreatedOn, ID, IResponseFields } from "./core.types";

export interface IProduct {
  name: string;
  manufacturer: MANUFACTURERS;
  price: number;
  amount: number;
  notes?: string;
}

export interface IProductFromTable{
  name: string;
  price: number;
  manufacturer: MANUFACTURERS;
}

export interface IProductInTable extends Pick<IProduct, "name" | "manufacturer" | "price">, ICreatedOn {}

export interface IProductDetails extends Required<IProduct>, ICreatedOn {}

export interface IProductFromResponse extends Required<IProduct>, ICreatedOn, ID {}

export interface IProductResponse extends IResponseFields {
  Product: IProductFromResponse;
}

export interface IProductsResponse extends IResponseFields {
  Products: IProductFromResponse[];
}

export interface ICreateProduct {
    title: string,
    productData: Partial<IProduct>,
    expectedStatus: number
}