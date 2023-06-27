import { useState, useEffect } from "react";
import useRoleService from "../../role/hooks/role-service.hook";
import { ApiResponse } from "../../../common/utils/api-response";
import { IMenuAccess } from "../../../common/interfaces/menuaccess.interface";

export function useApplicationsData() {
  const [applications, setApplications] = useState<IMenuAccess[]>(null);
  const {
    GetApplications,
  } = useRoleService();

  useEffect(() => {
    GetApplications().then((response: ApiResponse<IMenuAccess[]>) => {
      if (response) setApplications(response.data);
    });
  }, []);

  return { applications };
}
