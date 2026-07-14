import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home";
import IncreaseLimit from "./pages/Increaselimit";
import SupportPage from "./pages/SupportPage";
import Layout from "./components/Layout";


function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />

          <Route path="/home" element={<Home />} />
          <Route path="/packages" element={<IncreaseLimit />} />
          <Route path="/support" element={<SupportPage />} />

          <Route
            path="*"
            element={
              <div style={{ textAlign: "center", marginTop: 100 }}>
                <h1>404</h1>
                <p>Page Not Found</p>
              </div>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;