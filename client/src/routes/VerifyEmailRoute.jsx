import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/authStore";

const VerifyEmailRoute = () => {
  const { isRegistering } = useAuthStore();

  return isRegistering ? <Outlet /> : <Navigate to='/register' replace />;
};

export default VerifyEmailRoute;
