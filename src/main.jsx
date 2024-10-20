import App from "./App.jsx";
import { createRoot } from "react-dom/client";
import "./index.scss";
import { BrowserRouter as Router } from "react-router-dom";
import React from "react";

createRoot(document.getElementById("root")).render(
  <Router>
    {/* <StrictMode> */}
    <App />
    {/* </StrictMode> */}
  </Router>
);
