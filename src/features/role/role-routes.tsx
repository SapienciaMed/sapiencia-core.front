import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../../common/components/Guard/auth-private-guard";

function RoleRoutes() {
  const Role = lazy(() => import("./pages/role-list.page"));
  const RoleCrud = lazy(() => import("./pages/role-crud.page"));
  return (
    <Routes>
      <Route
        path={"/"}
        element={
          <PrivateRoute element={<Role />} allowedAction={"ROLES_CONSULTAR"} />
        }
      />

      <Route
        path={"/create"}
        element={
          <PrivateRoute
            element={<RoleCrud action="new" />}
            allowedAction={"ROLES_CREAR"}
          />
        }
      />

      <Route
        path={"/edit/:id"}
        element={
          <PrivateRoute
            element={<RoleCrud action="edit" />}
            allowedAction={"ROLES_EDITAR"}
          />
        }
      />
    </Routes>
  );
}

export default React.memo(RoleRoutes);
