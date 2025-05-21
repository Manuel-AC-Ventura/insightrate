import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export const GuestRoute = () => {
  const { isAuthenticated } = useAuth();

  return !isAuthenticated ? <Outlet /> : <Navigate to="/dashboard" />;
};