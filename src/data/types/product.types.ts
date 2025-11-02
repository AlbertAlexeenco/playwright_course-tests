
import { MANUFACTURERS } from "data/salesPortal/products/manufacturers";

export interface IProduct {
  name: string;
  manufacturer: MANUFACTURERS;
  price: number;
  amount: number;
  notes?: string;
}
export interface ICreatedOn {
  createdOn: string;
}
export interface IProductFromTable{
  name: string;
  price: number;
  manufacturer: MANUFACTURERS;
}

export interface IProductInTable extends Pick<IProduct, "name" | "manufacturer" | "price">, ICreatedOn {}


// export interface IProductInTableRow extends Pick<IProduct, "name" | "price" | "manufacturer"> {
//   createdOn: string;
// }

export interface IProductDetails extends Required<IProduct>, ICreatedOn {}
