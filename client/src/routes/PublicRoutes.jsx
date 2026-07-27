import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/authStore";

const PublicRoute = () => {
  const { isAuthenticated, user } = useAuthStore();
  const userRole = user?.role?.toLowerCase();

  if (!isAuthenticated) {
    return <Outlet />;
  }

  return userRole === "admin" ? <Navigate to="/admin" replace /> : <Navigate to="/" replace />;
};

export default PublicRoute;
