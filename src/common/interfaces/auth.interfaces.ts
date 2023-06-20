export interface IRequestSignIn {
  numberDocument: string;
  password: string;
}

export interface IResponseSignIn {
  authorization: IAuthorization;
  token: string;
}

export interface IRequestRefreshToken {
  refreshToken: string;
}

export interface IResponseRefreshToken {
  numberDocument: string;
  accessToken: string;
}

export interface IDecodedToken {
  id: number;
}

export interface IAuthorization {
  user: IUser;
  allowedActions: Array<string>;
  allowedApplications: Array<{
    aplicationId: number;
    dateValidity: Date;
  }>;
  encryptedAccess: string;
}

export interface IUser {
  id?: number;
  names: string;
  lastNames: string;
  typeDocument: string;
  numberDocument: string;
  password?: string;
  userModify: string;
  dateModify?: Date;
  userCreate: string;
  dateCreate?: Date;
}

export interface IRequestRecoveryPassword {
  numberDocument: string;
  email: string;
}
