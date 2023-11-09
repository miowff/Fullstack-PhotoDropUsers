import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export const SetUserDataPage = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      const { email, fullName, profilePhotoLink } = user;
      if (fullName !== null) {
        navigate("/set-full-name");
      } else if (email !== null) {
        navigate("/set-email");
      } else if (profilePhotoLink !== null) {
        navigate("/set-profile-photo");
      } else {
        navigate("/");
      }
    }
  }, [user, navigate]);

  return null;
};
