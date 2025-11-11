import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore, selectIsAuthenticated } from "@/stores";

function PrivateRoute() {
  const isAuthenticated = useAuthStore(selectIsAuthenticated);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
