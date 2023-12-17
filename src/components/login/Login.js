import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/user/getUserByUsername/${username}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const user = await response.json();

        if (user.password === password) {
          const { role, customer } = user;

          document.cookie = `role=${role.id};expires=1;path=/`;

          document.cookie = `customerId=${customer.id};expires=1;path=/`;

          login(user);

          navigate(user.role.id === 1 ? "/" : "/");
        } else {
          alert("Invalid credentials");
        }
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
