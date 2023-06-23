import React from "react";
import "../../../styles/login.scss";
import { useRecoveryPassword } from "../hooks/recovery-password.hooks";

import ChangePasswordComponent from "../components/change-password.component";
import useAuthService from "../../../common/hooks/auth-service.hook";

import { EResponseCodes } from "../../../common/constants/api.enum";
import { useNavigate } from "react-router-dom";

function ChangePasswordRecovery(): React.JSX.Element {
  const navigate = useNavigate();
  const { token: tokenRecovery } = useRecoveryPassword();

  const { changePasswordToken } = useAuthService();

  const callbackChangePassword = async (data: object) => {
    const { data: dataResponse, operation } = await changePasswordToken({
      ...data,
      tokenRecovery,
    });

    if (operation.code === EResponseCodes.OK) {
      alert("Contrasena cambiada exitosamente");
      navigate("../login");
    } else {
      alert("Error en el token");
    }
  };

  return <ChangePasswordComponent action={callbackChangePassword} />;
}

export default React.memo(ChangePasswordRecovery);
