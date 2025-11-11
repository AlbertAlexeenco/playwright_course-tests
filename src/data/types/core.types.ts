export interface ID {
  _id: string;
}

export interface ICreatedOn {
  createdOn: string;
}

export interface IResponseFields {
  IsSuccess: boolean;
  ErrorMessage: string | null;
}