import { useState, useEffect } from "react";
import useRoleService from "../../role/hooks/role-service.hook";
import { ApiResponse } from "../../../common/utils/api-response";
import { IMenuAccess } from "../../../common/interfaces/menuaccess.interface";

export function useApplicationsData() {
  const [applications, setApplications] = useState<IMenuAccess[]>(null);
  const {
    GetApplications,
    GetPagination,
    GetRole,
    CreateRole,
    UpdateRole,
    DeleteRole,
  } = useRoleService();

  useEffect(() => {
    GetApplications().then((response: ApiResponse<IMenuAccess[]>) => {
      if (response) setApplications(response.data);
    });

    // GetRole(1).then(response => {
    //   console.log(response)
    // })

    // CreateRole({
    //   name: "Prueba crear rol",
    //   description: "Prueba para probar hook",
    //   aplicationId: 2,
    //   userCreate: "sochoa",
    // }).then(response => {
    //   console.log(response)
    // })

    // UpdateRole(145,{
    //   name: "Prueba editar rol",
    //   description: "Prueba para probar hook",
    //   aplicationId: 2,
    //   userCreate: "sochoa",
    // }).then(response => {
    //   console.log(response)
    // })

    // DeleteRole(145).then(response => {
    //   console.log(response);
    // })
  }, []);

  return { applications };
}
