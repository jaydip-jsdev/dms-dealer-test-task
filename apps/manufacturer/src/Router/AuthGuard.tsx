import { Navigate, Outlet } from "react-router-dom";

import Home from "../Pages/Home";

const AuthGuard = () => {
  const token = localStorage.getItem("token");
  return <Home>{token ? <Outlet /> : <Navigate to="/login" replace />}</Home>;
};

export default AuthGuard;
