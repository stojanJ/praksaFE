import { Navigate, Route, Routes } from "react-router-dom";

import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import SingleMovie from "./Pages/SingleMovie";
import CreateMovie from "./Pages/CreateMovie";
import useAuth from "./Hooks/useAuth";

export const ProtectedRoute = ({ children }: { children: any }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};

export default function Router() {
  return (
    <div>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route
          path="/createMovie"
          element={
            <ProtectedRoute>
              <CreateMovie />
            </ProtectedRoute>
          }
        />
        <Route
          path="/movies/:movie_id"
          element={
            <ProtectedRoute>
              <SingleMovie />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}
