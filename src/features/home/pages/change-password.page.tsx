import React from "react";

import "../../../styles/login.scss";
import  { useUserService }  from "../../../common/hooks/user-service.hook";
import ChangePasswordComponent from "../components/change-password.component";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { useNavigate } from "react-router-dom";


function ChangePasswordRecovery(): React.JSX.Element {
  const navigate = useNavigate();
  
  const token =   localStorage.getItem("token");  

  const { changePassword } = useUserService(token);

  const callbackChangePassword = async (data: object) => {
    const { data: dataResponse, operation } = await changePassword({
      ...data
    });

    if (operation.code === EResponseCodes.OK) {
      navigate("../login");
    } else {
      alert("Error en el token");
    }
  };

  return <ChangePasswordComponent action={callbackChangePassword} />;
}

export default React.memo(ChangePasswordRecovery);