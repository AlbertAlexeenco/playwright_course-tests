import { ICreatedOn, ID, IResponseFields } from "./core.types";

export interface IUser {
  username: string;
  firstName: string;
  lastName: string;
  roles: string[];
}

export interface IUserFromResponse extends Required<IUser>, ICreatedOn, ID {}

export interface IUserResponse extends IResponseFields {
  Product: IUserFromResponse;
}