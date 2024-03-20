import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/auth/Register.js";
import Discover from "./pages/home/discover.tsx";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Discover />} />
      <Route path="/register" element={<Register />} />
      <Route path="/discover" element={<Discover />} />
    </Routes>
  );
}

export default Router;
