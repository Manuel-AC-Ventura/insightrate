import { Navigate } from "react-router-dom";
import { useContext, type JSX } from "react";
import { AuthContext } from "../context/authContext";

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const auth = useContext(AuthContext);
  if (!auth?.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};