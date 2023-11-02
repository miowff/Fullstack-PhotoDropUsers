import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { LestGetStarted } from "./pages/LestGetStarted";
import { PrivateWrapper } from "./utils/protectedRoute";
import { useEffect } from "react";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");
    if (token) {
      localStorage.setItem("authToken", token);
      navigate("/");
    }
  });
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

export default App;
