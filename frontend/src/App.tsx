import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "./enums/constants";
import { useDispatch } from "react-redux";
import { useLazyGetCurrentUserQuery } from "./api/auth";
import { UserModel } from "../../backend/src/models/user";
import { setUser } from "./redux/user/authSlice";
import { AppRoutes } from "./components/Routes";

const App = () => {
  const [getUser] = useLazyGetCurrentUserQuery();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");
    const refresh = searchParams.get("refresh");
    if (token && refresh) {
      localStorage.setItem(ACCESS_TOKEN_KEY, token);
      localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
      navigate("/");
    }
  });
  useEffect(() => {
    getUser()
      .unwrap()
      .then((data: UserModel) => {
        if (data) {
          console.log(data);
          dispatch(setUser(data));
          if (location.pathname === "/start") {
            return navigate("/");
          }
          return navigate(location);
        }
      });
  }, []);
  return (
    <>
      <div className="wrapper">
        <AppRoutes />
      </div>
    </>
  );
};
export const foo = 12;
export default App;
