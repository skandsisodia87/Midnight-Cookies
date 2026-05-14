import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/authStore";

const PublicRoute = () => {
  const { isAuthenticated } = useAuthStore();

  return !isAuthenticated ? <Outlet /> : <Navigate to='/' replace />;
};

export default PublicRoute;
