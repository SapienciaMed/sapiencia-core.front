import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../../common/components/Guard/auth-private-guard";

function UserRoutes() {
  const CreateUser = lazy(() => import("./pages/user-create.page"));
  const ConsultUser = lazy(() => import("../../features/user/pages/consult-user"));

  return (
    <Routes>
      <Route
        path={"/crear"}
        element={
          <PrivateRoute
            element={<CreateUser />}
            allowedAction={"USUARIOS_CREAR"}
          />
        }
      />
      <Route path={"/consultar"} element={ <ConsultUser /> } />
    </Routes>
  );
}

export default React.memo(UserRoutes);
