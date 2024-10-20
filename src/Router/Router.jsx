import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Settings from "../Pages/Settings";
import Brands from "../Pages/Brands";
import Models from "../Pages/Models";
import Locations from "../Pages/Locations";
import Cities from "../Pages/Cities";
import Cars from "../Pages/Cars";

const Router = () => {
  return (
    <div>
      <Routes>
        <Route path="/">
          <Route path="/home" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/models" element={<Models />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/cities" element={<Cities />} />
          <Route path="/cars" element={<Cars />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Router;
