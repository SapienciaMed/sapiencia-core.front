import { IMenuAccess } from "../interfaces/menuaccess.interface";
import { IRole } from "../interfaces/role.interface";
import { ApiResponse, IPagingData } from "../utils/api-response";
import useCrudService from "./crud-service.hook";

export function useRoleService() {
  const baseURL: string = "http://localhost:3333";
  const roleUrl: string = "/api/v1/role";
  const { get, post, put, deleted } = useCrudService(null, baseURL);

  async function GetApplications(): Promise<ApiResponse<IMenuAccess[]>> {
    return get(`/api/v1/access-elements/aplication/get-all`);
  }

  async function GetPagination(
    page: number,
    perPage: number,
    name: string
  ): Promise<ApiResponse<IPagingData<IRole>>> {
    const endpoint: string = "/get-paginated";
    const params = { page: page, perPage: perPage, name: name };
    return get(`${roleUrl}${endpoint}`, params);
  }

  async function GetRole(id: number): Promise<ApiResponse<IRole>> {
    const endpoint: string = `/get-by-id/${id}`;
    return get(`${roleUrl}${endpoint}`);
  }

  async function CreateRole(data: Object): Promise<ApiResponse<IRole>> {
    const endpoint: string = "/create";
    return post(`${roleUrl}${endpoint}`, data);
  }

  async function UpdateRole(
    id: number,
    data: Object
  ): Promise<ApiResponse<IRole>> {
    const endpoint: string = `/update/${id}`;
    return put(`${roleUrl}${endpoint}`, data);
  }

  async function DeleteRole(id: number): Promise<ApiResponse<boolean>> {
    const endpoint: string = `/delete/${id}`;
    return deleted(`${roleUrl}${endpoint}`);
  }

  return {
    GetApplications,
    GetPagination,
    GetRole,
    CreateRole,
    UpdateRole,
    DeleteRole,
  };
}
