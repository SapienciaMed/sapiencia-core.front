// import { useEffect } from "react";
// import { EResponseCodes } from "../constants/api.enum";
// import useAuthService from "./auth-service.hook";
// import { useNavigate } from "react-router-dom";

// const { getAuthorization } = useAuthService();
// const navigate = useNavigate();

// useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       getAuthorization(token)
//         .then((res) => {
//           if (res.operation.code == EResponseCodes.OK) {
            
//           } else {
//             localStorage.removeItem("token");
//           }
//         })
//         .catch(() => {});
//     }else {
//         navigate("../login");
//     }
//   }, []);