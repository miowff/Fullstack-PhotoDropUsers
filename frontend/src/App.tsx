import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { LestGetStarted } from "./pages/LestGetStarted";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <body>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/start" element={<LestGetStarted />} />
        </Routes>
      </body>
      <Footer />
    </div>
  );
}

export default App;
