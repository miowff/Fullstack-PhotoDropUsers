import { Navigate } from "react-router-dom";

export const PrivateWrapper = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  return token ? children : <Navigate to="/start" replace />;
};
