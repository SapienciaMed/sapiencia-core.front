import { Suspense, lazy, useEffect , useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppContext, AppContextProvider } from "./common/contexts/app.context";
import "./styles/_app.scss";
import "./styles/_theme-prime.css";
import "primereact/resources/primereact.min.css";
import ModalMessageComponent from "./common/components/modal-message.component";

function App() {
  const Role = lazy(() => import("./features/role/pages/role-list.page"));
  const RoleCrud = lazy(() => import("./features/role/pages/role-crud.page"));
  const CreateUser = lazy(() => import("./features/user/pages/user-create.page"));
  const Login = lazy(() => import("./features/home/pages/login.page"));
  const Home = lazy(() => import("./features/home/pages/home.page"));
  const RecoveryPassword = lazy(
    () => import("./features/home/pages/recovery-password.page")
  );
  const ChangePasswordRecovery = lazy(
    () => import("./features/home/pages/change-password-token.page")
  );

  const ChangePassword =  lazy(
    () => import("./features/home/pages/change-password.page")
  );
  const AuthGuardPublic = lazy(
    () => import("./common/components/Guard/auth-public-guard")
  );
  return (
    <AppContextProvider>
       <ModalMessageComponent/>
      <Router>
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route path={"/*"} element={<Home />} />
            <Route
              path={"/login"}
              element={
                <AuthGuardPublic>
                  <Login />
                </AuthGuardPublic>
              }
            />
            <Route
              path={"/recovery-password"}
              element={
                <AuthGuardPublic>
                  <RecoveryPassword />
                </AuthGuardPublic>
              }
            />

            <Route
              path={"/change-password-recovery"}
              element={
                <AuthGuardPublic>
                  <ChangePasswordRecovery />
                </AuthGuardPublic>
              }
            />
              <Route
              path={"/change-password"}
              element={
                <ChangePassword/>
              }
            />
            <Route path={"/core/roles"} element={<Role />} />
            <Route path={"/core/roles/create"} element={<RoleCrud />} />
            <Route path={"/core/users"} element={<CreateUser/>} />
          </Routes>
        </Suspense>
      </Router>
    </AppContextProvider>
  );
}

export default App;
