import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { LestGetStarted } from "./pages/LestGetStarted";
import { PrivateWrapper } from "./utils/protectedRoute";

function App() {
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
