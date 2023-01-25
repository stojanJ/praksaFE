import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { authService } from "../Services/AuthService";
import { IUser } from "../Types/user";

const AuthContext: any = createContext(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const userToken = localStorage.getItem("user");
  const userData = userToken ? JSON.parse(userToken) : {};
  const [user, setUser] = useState<IUser>();

  const handleRegister = async (data: any) => {
    try {
      const response = await authService.register(data);
      setUser(response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/");
    } catch (error) {}
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        register: handleRegister,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuth(): any {
  return useContext(AuthContext);
}
