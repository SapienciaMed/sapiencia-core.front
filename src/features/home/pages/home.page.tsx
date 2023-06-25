import React, { useContext, useEffect } from "react";
import WelcomeContainerComponent from "../components/welcome-container.component";
import ApplicationsContainerComponent from "../components/applications-container.component";
import useAppCominicator from "../../../common/hooks/app-communicator.hook";
import { AppContext } from "../../../common/contexts/app.context";

interface IAppProps {}

function HomePage(props: IAppProps) {
  const { subscribe, unsubscribe } = useAppCominicator();
  const { setMessage } = useContext(AppContext);

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
