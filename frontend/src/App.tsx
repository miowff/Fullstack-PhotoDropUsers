import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { LestGetStarted } from "./pages/LestGetStarted";
import { PrivateWrapper } from "./utils/protectedRoute";
import { useEffect } from "react";
import { ACCESS_TOKEN_KEY } from "./enums/constants";
import { useDispatch } from "react-redux";
import { useLazyGetCurrentUserQuery } from "./api/auth";
import { UserModel } from "../../backend/src/models/user";
import { logOut, setUser } from "./redux/user/authSlice";

function App() {
  const [getUser] = useLazyGetCurrentUserQuery();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");
    if (token) {
      localStorage.setItem(ACCESS_TOKEN_KEY, token);
      navigate("/");
    }
  });
  useEffect(() => {
    getUser()
      .unwrap()
      .then((data: UserModel) => {
        if (data) {
          dispatch(setUser(data));
          navigate("/");
        } else {
          console.log("logout");
          dispatch(logOut());
        }
      });
  }, []);
  return (
    <div className="wrapper">
      <Routes>
        <Route
          path="/"
          element={
            <PrivateWrapper>
              <HomePage />
            </PrivateWrapper>
          }
        />
        <Route path="/start" element={<LestGetStarted />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </div>
  );
}
export const foo = 12;
export default App;
