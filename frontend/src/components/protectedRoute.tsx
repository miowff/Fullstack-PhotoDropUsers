import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { RootState } from "../redux/store";

export const PrivateWrapper = ({ children }: { children: JSX.Element }) => {
  const isAuth = useAuth();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (user) {
      const { email, fullName, profilePhotoLink } = user;
      if (profilePhotoLink === null) {
        return navigate("/set-profile-photo");
      } else if (fullName === null) {
        return navigate("/set-full-name");
      } else if (email === null) {
        return navigate("/set-email");
      }
    }
  }, [user, navigate]);

  if (isAuth !== null) {
    return isAuth ? children : <Navigate to="/number-input" replace />;
  }
  if (!user) {
    return children;
  }
};
