import { EResponseCodes } from "../constants/api.enum";
import {
  IAuthorization,
  IResponseSignIn,
  IDecodedToken,
} from "../interfaces/auth.interfaces";
import { ApiResponse } from "../utils/api-response";
import useCrudService from "./crud-service.hook";

export function useAuthService() {
  const baseURL: string = "http://localhost:3333";
  const authUrl: string = "/api/v1/auth";

  const { get, post, put, deleted } = useCrudService(null, baseURL);

  async function signIn(data: Object): Promise<ApiResponse<IResponseSignIn>> {
    try {
      const endpoint: string = "/signin";
      return await post(`${authUrl}${endpoint}`, data);
    } catch (error) {
      return new ApiResponse(
        {} as IResponseSignIn,
        EResponseCodes.FAIL,
        "Error no controlado"
      );
    }
  }

  async function getAuthorization(
    token: string
  ): Promise<ApiResponse<IAuthorization>> {
    try {
      const endpoint: string = `/authorization/get-by-token/${token}`;
      return await get(`${authUrl}${endpoint}`);
    } catch (error) {
      return new ApiResponse(
        {} as IAuthorization,
        EResponseCodes.FAIL,
        "Error no controlado"
      );
    }
  }

  async function recoveryPassword(
    data: Object
  ): Promise<ApiResponse<IResponseSignIn>> {
    try {
      const endpoint: string = "/recoverypassword";
      return await post(`${authUrl}${endpoint}`, data);
    } catch (error) {
      return new ApiResponse(
        {} as IResponseSignIn,
        EResponseCodes.FAIL,
        "Error no controlado"
      );
    }
  }

  async function validateTokenRecovery(
    data: Object
  ): Promise<ApiResponse<IDecodedToken>> {
    try {
      const endpoint: string = "/validateTokenRecovery";
      return await post(`${authUrl}${endpoint}`, data);
    } catch (error) {
      return new ApiResponse(
        {} as IDecodedToken,
        EResponseCodes.FAIL,
        "Error no controlado"
      );
    }
  }

  async function changePasswordToken(
    data: Object
  ): Promise<ApiResponse<IDecodedToken>> {
    try {
      const endpoint: string = "/changePasswordRecovery";
      return await post(`${authUrl}${endpoint}`, data);
    } catch (error) {
      return new ApiResponse(
        {} as IDecodedToken,
        EResponseCodes.FAIL,
        "Error no controlado"
      );
    }
  }

  return {
    signIn,
    getAuthorization,
    recoveryPassword,
    validateTokenRecovery,
    changePasswordToken,
  };
}

export default useAuthService;
