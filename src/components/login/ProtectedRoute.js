import React, { useEffect, useState } from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const { authenticated, role } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };

    checkAuthentication();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Route
      {...rest}
      element={authenticated ? <Element /> : <Navigate to="/login" />}
    />
  );
};

export default ProtectedRoute;
