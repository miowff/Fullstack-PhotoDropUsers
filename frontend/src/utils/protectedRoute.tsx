import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const PrivateWrapper = ({ children }: { children: JSX.Element }) => {
  const isAuth = useAuth();
  return isAuth ? children : <Navigate to="/start" replace />;
};
