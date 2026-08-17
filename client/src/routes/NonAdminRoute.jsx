import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/authStore";
import constants from "../common/constants";

const NonAdminRoute = () => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user?.role === constants.ADMIN) {
    return <Navigate to={constants.ROUTES.ADMIN.DASHBOARD} replace />;
  }

  return <Outlet />;
};

export default NonAdminRoute;
