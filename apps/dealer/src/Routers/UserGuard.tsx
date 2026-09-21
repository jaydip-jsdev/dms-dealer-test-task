import { Navigate } from "react-router-dom";

import Login from "../Pages/Login";

const UserGuard = () => {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/" replace /> : <Login />;
};

export default UserGuard;
