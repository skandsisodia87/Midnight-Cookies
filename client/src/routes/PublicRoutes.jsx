import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/authStore";
import constants from "../common/constants";

const PublicRoute = () => {
  const { isAuthenticated, user } = useAuthStore();
  const userRole = user?.role?.toLowerCase();

  if (!isAuthenticated) {
    return <Outlet />;
  }

  return userRole === constants.ADMIN ? (
    <Navigate to={constants.ROUTES.ADMIN.DASHBOARD} replace />
  ) : (
    <Navigate to="/" replace />
  );
};

export default PublicRoute;
