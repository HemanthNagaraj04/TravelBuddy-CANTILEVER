
import { Outlet, Navigate } from "react-router";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const ProtectedRoutes = () => {
  const { isLoggedIn } = useContext(UserContext);
  return isLoggedIn ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRoutes;
