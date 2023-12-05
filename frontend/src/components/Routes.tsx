import { SetFullNamePage } from "../pages/SetFullNamePage";
import { SetProfilePhotoPage } from "../pages/SetProfilePhoto";
import { SetEmailPage } from "../pages/SetEmailPage";
import { PrivateWrapper } from "../components/protectedRoute";
import { ProfileDetails } from "../pages/ProfileDetails";
import { PrivacyPolicy } from "../pages/PrivacyPolicy";
import { NumberInputPage } from "../pages/LetsGetStarted/NumberInputPage";
import { CodeInputPage } from "../pages/LetsGetStarted/CodeInputPage";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { AlbumDetails } from "../pages/AlbumDetails";
import { Success } from "../pages/Sucess";
export const AppRoutes = () => {
  return (
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
      <Route
        path="/album/:id"
        element={
          <PrivateWrapper>
            <AlbumDetails />
          </PrivateWrapper>
        }
      ></Route>
      <Route
        path="/success/:id"
        element={
          <PrivateWrapper>
            <Success />
          </PrivateWrapper>
        }
      ></Route>
      <Route path="/number-input" element={<NumberInputPage />} />
      <Route path="/code-input" element={<CodeInputPage />} />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
};
