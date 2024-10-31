import React from "react";
import "./App.scss";
import Layout from "./Components/Layout/Layout";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="app-container container">
      <Layout />
    </div>
  );
};

export default App;
