import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/authStore";
import constants from "../common/constants";

const ProtectedRoute = () => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to={constants.ROUTES.LOGIN} replace />;
  }

  if (user?.role === constants.ADMIN) {
    return <Navigate to={constants.ROUTES.ADMIN.DASHBOARD} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
