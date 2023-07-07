import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppContextProvider } from "./common/contexts/app.context";
import "./styles/_app.scss";
import "./styles/_theme-prime.css";
import "primereact/resources/primereact.min.css";
import ModalMessageComponent from "./common/components/modal-message.component";
import ApplicationProvider from "./application-provider";
import RoleRoutes from "./features/role/role-routes";
import UserRoutes from "./features/user/user-routes";
import HomesRoutes from "./features/home/homes-routes";

function App() {
  const Home = lazy(() => import("./features/home/pages/home.page"));

  return (
    <AppContextProvider>
      <ModalMessageComponent />
      <ApplicationProvider>
        <Suspense fallback={<p>Loading...</p>}>
          <Router>
            <Routes>
              <Route path={"/"} element={<Home />} />
              <Route path="/core/roles/*" element={<RoleRoutes />} />
              <Route path="/core/usuarios/*" element={<UserRoutes />} />
              <Route path="/*" element={<HomesRoutes />} />
            </Routes>
          </Router>
        </Suspense>
      </ApplicationProvider>
    </AppContextProvider>
  );
}
export default React.memo(App);
