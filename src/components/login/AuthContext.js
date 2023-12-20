import React, { createContext, useContext, useState } from "react";
import { useCookies } from "react-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [cookies, setCookie] = useCookies(["role", "customerId", "userId"]);
  const [authenticated, setAuthenticated] = useState(!!cookies.role);
  const [role, setRole] = useState(cookies.role);
  const [customerId, setCustomerId] = useState(cookies.customerId);
  const [userId, setUserId] = useState(cookies.userId);

  const login = (user) => {
    setAuthenticated(true);
    setRole(user.roleId);
    setCustomerId(user.customerId);
    setUserId(user.id);

    let date = new Date();
    date.setFullYear(date.getFullYear() + 1);

    setCookie("role", user.roleId, { expires: date });
    setCookie("customerId", user.customerId, { expires: date });
    setCookie("userId", user.id, { expires: date });
  };

  const logout = () => {
    setAuthenticated(false);
    setRole(null);
    setCustomerId(null);
    setUserId(null);

    setCookie("role", "", { expires: new Date(0) });
    setCookie("customerId", "", { expires: new Date(0) });
    setCookie("userId", "", { expires: new Date(0) });
  };

  return (
    <AuthContext.Provider
      value={{ authenticated, role, customerId, userId, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
