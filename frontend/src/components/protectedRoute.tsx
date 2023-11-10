import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect } from "react";

export const PrivateWrapper = ({ children }: { children: JSX.Element }) => {
  const isAuth = useAuth();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  useEffect(() => {
    if (user) {
      const { email, fullName, profilePhotoLink } = user;
      if (fullName === null) {
        navigate("/set-full-name");
      } else if (email === null) {
        navigate("/set-email");
      } else if (profilePhotoLink === null) {
        navigate("/set-profile-photo");
      } else {
        navigate("/");
      }
    }
  }, [user, navigate]);
  return isAuth ? children : <Navigate to="/start" replace />;
};
