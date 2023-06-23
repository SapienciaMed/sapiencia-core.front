import React, { useContext, useEffect } from "react";
import WelcomeContainerComponent from "../components/welcome-container.component";
import ApplicationsContainerComponent from "../components/applications-container.component";
import useAppCominicator from "../../../common/hooks/app-communicator.hook";
import { AppContext } from "../../../common/contexts/app.context";
import useAuthService from "../../../common/hooks/auth-service.hook";
import { EResponseCodes } from "../../../common/constants/api.enum";
import ModalMessageComponent from "../../../common/components/modal-message.component";

interface IAppProps {}

function HomePage(props: IAppProps) {
  const { getAuthorization } = useAuthService();
  const { setAuthorization } = useContext(AppContext);
  const { subscribe, unsubscribe } = useAppCominicator();
  const { setMessage } = useContext(AppContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getAuthorization(token)
        .then((res) => {
          if (res.operation.code == EResponseCodes.OK) {
            setAuthorization(res.data);
          } else {
            localStorage.removeItem("token");
          }
        })
        .catch(() => {});
    }
  }, []);
  useEffect(() => {
    subscribe("modalCloseSession", (data) => {
      console.log(data);
      setMessage(data.detail);
    });
    return () => {
      unsubscribe("modalCloseSession", () => {});
    };
  }, []);
  return (
    <div className="dashboard-margin full-height">
      <WelcomeContainerComponent />
      <ApplicationsContainerComponent />
    </div>
  );
}

export default React.memo(HomePage);
