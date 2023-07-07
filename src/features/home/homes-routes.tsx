import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../../common/components/Guard/auth-private-guard";

function HomeRoutes() {
  const RecoveryPassword = lazy(() => import("./pages/recovery-password.page"));
  const ChangePasswordRecovery = lazy(
    () => import("./pages/change-password-token.page")
  );

  const ChangePassword = lazy(() => import("./pages/change-password.page"));
  const Login = lazy(() => import("./pages/login.page"));

  return (
    <Routes>
      <Route path={"/login"} element={<Login />} />

      <Route path={"/recovery-password"} element={<RecoveryPassword />} />

      <Route
        path={"/change-password-recovery"}
        element={<ChangePasswordRecovery />}
      />
      <Route path={"/change-password"} element={<ChangePassword />} />
    </Routes>
  );
}

export default React.memo(HomeRoutes);
