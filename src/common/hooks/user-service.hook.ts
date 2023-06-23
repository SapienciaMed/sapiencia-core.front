import { EResponseCodes } from "../constants/api.enum";
import { IAuthorization, IUser } from "../interfaces/auth.interfaces";
import { IUserCreate } from "../interfaces/user.interfaces";
import { ApiResponse, IPagingData } from "../utils/api-response";
import useCrudService from "./crud-service.hook";

export function useUserService(token) {
  const baseURL: string = "http://localhost:3333";
  const userUrl: string = "/api/v1/user";
  const { get, post, put, deleted } = useCrudService(token, baseURL);

  async function GetPagination(
    page: number,
    perPage: number,
    name: string
  ): Promise<ApiResponse<IPagingData<IUserCreate>>> {
    const endpoint: string = "/get-paginated";
    const params = { page: page, perPage: perPage, name: name };
    return get(`${userUrl}${endpoint}`, params);
  }

  async function GetUser(id: number): Promise<ApiResponse<IUserCreate>> {
    const endpoint: string = `/get-by-id/${id}`;
    return get(`${userUrl}${endpoint}`);
  }

  async function CreateUser(data: Object): Promise<ApiResponse<IUserCreate>> {
    const endpoint: string = "/create";
    return post(`${userUrl}${endpoint}`, data);
  }

  async function UpdateUser(
    id: number,
    data: Object
  ): Promise<ApiResponse<IUserCreate>> {
    const endpoint: string = `/update/${id}`;
    return put(`${userUrl}${endpoint}`, data);
  }

  async function DeleteUser(id: number): Promise<ApiResponse<boolean>> {
    const endpoint: string = `/delete/${id}`;
    return deleted(`${userUrl}${endpoint}`);
  }

  async function ChangePassword(data: Object): Promise<ApiResponse<IUser>> {
    try {
      const endpoint: string = `/changePassword`;
      return post(`${userUrl}${endpoint}`);
    } catch (error) {
      return new ApiResponse(
        {} as IUser,
        EResponseCodes.FAIL,
        "Error no controlado"
      );
    }
    
  }




  return {
    GetPagination,
    GetUser,
    CreateUser,
    UpdateUser,
    DeleteUser,
    ChangePassword,
  };
}
