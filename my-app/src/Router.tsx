import React from "react";
import { Route, Routes } from "react-router-dom";

import Register from "./Pagrs/Register";

export default function Router() {
  return (
    <div>
      <Routes>
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}
