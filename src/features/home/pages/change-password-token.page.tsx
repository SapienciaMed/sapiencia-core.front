import React, { useContext, useEffect } from "react";
import "../../../styles/login.scss";
import { useRecoveryPassword } from "../hooks/recovery-password.hooks";
import ChangePasswordComponent from "../components/change-password.component";
import useAuthService from "../../../common/hooks/auth-service.hook";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../common/contexts/app.context";

function ChangePasswordRecovery(): React.JSX.Element {
  //context
  const { setMessage } = useContext(AppContext);

  // react-router-dom
  const navigate = useNavigate();

  // hooks
  const { token: tokenRecovery, showModal } = useRecoveryPassword();

  const { changePasswordToken } = useAuthService();

  useEffect(() => {
    if (showModal)
      setMessage({
        title: "¡Error en el token!",
        description:
          "El token es invalido, vuelva a intentarlo generando nuevamente un correo",
        show: true,
        OkTitle: "Aceptar",
        onClose: () => {
          setMessage({});
          navigate("../login");
        },
        onOk: () => {
          setMessage({});
          navigate("../login");
        },
      });
  }, [showModal]);

  // callback invoke function api
  const callbackChangePassword = async (data: object) => {
    const { data: dataResponse, operation } = await changePasswordToken({
      ...data,
      tokenRecovery,
    });

    if (operation.code === EResponseCodes.OK) {
      navigate("../login");
    } else {
      setMessage({
        title: "¡Ocurrio un error!",
        description:
          "El token es invalido o ha ocurrido un error inesperado, intenta nuevamente",
        show: true,
        OkTitle: "Aceptar",
        onOk: () => {
          setMessage({});
        },
        background: true,
      });
    }
  };

  return showModal ? (
    <></>
  ) : (
    <ChangePasswordComponent action={callbackChangePassword} />
  );
}

export default React.memo(ChangePasswordRecovery);
