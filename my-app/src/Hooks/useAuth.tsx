import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { authService } from "../Services/AuthService";
import { IUser } from "../Types/user";

const AuthContext: any = createContext(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  // const localUsedData = localStorage.getItem("user");
  // const userData = localUsedData ? JSON.parse(localUsedData) : {};

  const handleLogin = async (data: IUser) => {
    try {
      const response = await authService.login(data);
      setUser(response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegister = async (data: IUser) => {
    try {
      const response = await authService.register(data);
      setUser(response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/login");
    } catch (error) {}
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        register: handleRegister,
        login: handleLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuth(): any {
  return useContext(AuthContext);
}
