import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { useEffect } from "react";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "./enums/constants";
import { useDispatch } from "react-redux";
import { useLazyGetCurrentUserQuery } from "./api/auth";
import { UserModel } from "../../backend/src/models/user";
import { setUser } from "./redux/user/authSlice";
import { SetFullNamePage } from "./pages/SetFullNamePage";
import { SetProfilePhotoPage } from "./pages/SetProfilePhoto";
import { SetEmailPage } from "./pages/SetEmailPage";
import { PrivateWrapper } from "./components/protectedRoute";
import { ProfileDetails } from "./pages/ProfileDetails";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { NumberInputPage } from "./pages/LetsGetStarted/NumberInputPage";
import { CodeInputPage } from "./pages/LetsGetStarted/CodeInputPage";

function App() {
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
          dispatch(setUser(data));
          if (location.pathname === "/start") {
            return navigate("/");
          }
          return navigate(location);
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
        <Route
          path="/set-full-name"
          element={
            <PrivateWrapper>
              <SetFullNamePage />
            </PrivateWrapper>
          }
        ></Route>
        <Route
          path="/set-profile-photo"
          element={
            <PrivateWrapper>
              <SetProfilePhotoPage />
            </PrivateWrapper>
          }
        ></Route>
        <Route
          path="/set-email"
          element={
            <PrivateWrapper>
              <SetEmailPage />
            </PrivateWrapper>
          }
        ></Route>
        <Route
          path="/me"
          element={
            <PrivateWrapper>
              <ProfileDetails />
            </PrivateWrapper>
          }
        ></Route>
        <Route
          path="/privacy-policy"
          element={
            <PrivateWrapper>
              <PrivacyPolicy />
            </PrivateWrapper>
          }
        ></Route>
        <Route path="/number-input" element={<NumberInputPage />} />
        <Route path="/code-input" element={<CodeInputPage />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </div>
  );
}
export const foo = 12;
export default App;
