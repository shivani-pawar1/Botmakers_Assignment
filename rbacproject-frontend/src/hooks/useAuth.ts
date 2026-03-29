import { useState } from "react";

type UserType = {
  token: string;
  role: string;
};

export const useAuth = () => {
  const [user, setUser] = useState<UserType | null>(
    JSON.parse(localStorage.getItem("user") || "null")
  );

  const loginUser = (token: string, role: string) => {
    const userData = { token, role };

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));

    setUser(userData);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return { user, loginUser, logout };
};