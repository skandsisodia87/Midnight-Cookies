import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/authStore";
import constants from "../common/constants";

const AdminRoute = () => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to={constants.ROUTES.LOGIN} replace />;
  }

  if (!user || user.role !== constants.ADMIN) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
