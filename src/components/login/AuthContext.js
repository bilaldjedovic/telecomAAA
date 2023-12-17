import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [customerId, setCustomerId] = useState(null);

  const login = (user) => {
    setAuthenticated(true);
    setRole(user.role.id);
    setCustomerId(user.customer.id);

    document.cookie = `role=${user.role.id};expires=1;path=/`;
    document.cookie = `customerId=${user.customer.id};expires=1;path=/`;
  };

  const logout = () => {
    setAuthenticated(false);
    setRole(null);
    setCustomerId(null);
  };

  return (
    <AuthContext.Provider
      value={{ authenticated, role, customerId, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
