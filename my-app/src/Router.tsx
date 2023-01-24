import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Register from "./Pagrs/Register";
import Login from "./Pagrs/Login";
import Home from "./Pagrs/Home";

export default function Router() {
  return (
    <div>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}
