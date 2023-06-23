import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppContextProvider } from "./common/contexts/app.context";
import "./styles/_app.scss";
import "./styles/_theme-prime.css";
import "primereact/resources/primereact.min.css";

function App() {
  const Role = lazy(() => import("./features/role/pages/role-list.page"));
  const Login = lazy(() => import("./features/home/pages/login.page"));
  const Home = lazy(() => import("./features/home/pages/home.page"));
  const RecoveryPassword = lazy(
    () => import("./features/home/pages/recovery-password.page")
  );
  const ChangePassword = lazy(
    () => import("./features/home/pages/change-password-token.page")
  );

  const AuthGuardPublic = lazy(
    () => import("./common/components/Guard/auth-public-guard")
  );

  return (
    <AppContextProvider>
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
              path={"/change-password"}
              element={
                <AuthGuardPublic>
                  <ChangePassword />
                </AuthGuardPublic>
              }
            />

            <Route path={"/core/roles"} element={<Role />} />
          </Routes>
        </Suspense>
      </Router>
    </AppContextProvider>
  );
}

export default App;
