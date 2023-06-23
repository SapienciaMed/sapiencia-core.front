export interface IUserCreate {
    id?: number;
    names: string;
    lastNames: string;
    typeDocument: string;
    numberDocument: string;
    email: string;
    password?: string;
    userModify?: string;
    userCreate?: string;
  }