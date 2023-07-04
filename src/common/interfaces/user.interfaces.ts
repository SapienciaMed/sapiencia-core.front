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

export interface ISystemUser {
  id?: number,
  documentNumber: string,
  profile: string,
  email: string,
  names: string,
  lastNames: string
}