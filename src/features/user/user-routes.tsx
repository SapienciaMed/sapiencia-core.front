import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../../common/components/Guard/auth-private-guard";

function UserRoutes() {
  const CreateUser = lazy(() => import("./pages/user-create.page"));

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
    </Routes>
  );
}

export default React.memo(UserRoutes);
