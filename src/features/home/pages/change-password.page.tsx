import React, { useContext } from "react";

import "../../../styles/login.scss";
import  { useUserService }  from "../../../common/hooks/user-service.hook";
import ChangePasswordComponent from "../components/change-password.component";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../common/contexts/app.context";


function ChangePasswordRecovery(): React.JSX.Element {
  const navigate = useNavigate();
  const { setMessage } = useContext(AppContext);
  const token =   localStorage.getItem("token");  

  const { changePassword } = useUserService(token);

  const callbackChangePassword = async (data: object) => {
    const { data: dataResponse, operation } = await changePassword({
      ...data
    });

    if (operation.code === EResponseCodes.OK) {
      navigate("../login");
    } else {
        setMessage({
            title: "Ocurrio un error!",
            description:
              "El token es invalido o ha ocurrido un error inesperado, intenta nuevamente",
            show: true,
            OkTitle: "Aceptar",
            onOk: () => {
              setMessage({});
            },
          });
    }
  };

  return <ChangePasswordComponent action={callbackChangePassword} />;
}

export default React.memo(ChangePasswordRecovery);
