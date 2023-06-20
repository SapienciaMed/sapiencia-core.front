import { Navigate } from "react-router-dom";

const AuthPublic = ({ children }) => {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to={"/"} replace />;
  }

  return children;
};

export default AuthPublic;
