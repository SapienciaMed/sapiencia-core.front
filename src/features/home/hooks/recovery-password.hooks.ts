import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useAuthService from "../../../common/hooks/auth-service.hook";
import { EResponseCodes } from "../../../common/constants/api.enum";

export function useRecoveryPassword() {
  // STATE
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const { validateTokenRecovery } = useAuthService();

  const tokenChangePassword = searchParams.get("token");

  const validateTokenRedirect = async () => {
    try {
      const { operation } = await validateTokenRecovery({
        token: tokenChangePassword,
      });
      if (operation.code === EResponseCodes.FAIL) {
        setShowModal(!showModal);
      }
    } catch (error) {
      navigate("../login");
    }
  };

  useEffect(() => {
    if (!tokenChangePassword) {
      navigate("../login");
    } else {
      validateTokenRedirect();
    }
  }, [searchParams]);

  return {
    token: tokenChangePassword,
    showModal,
  };
}
