import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/authStore";

const NonAdminRoute = () => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user?.role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
};

export default NonAdminRoute;
