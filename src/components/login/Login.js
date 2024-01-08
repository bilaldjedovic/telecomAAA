import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import styled from "styled-components";

const LoginContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  margin-top: 90px
  background-color: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const PageContainer = styled.div`
 display: flex;
 justify-content: center;
 align-items: center;
 height: 70vh;
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
`;

const InputContainer = styled.div`
  margin-bottom: 15px;

  label {
    display: block;
    margin-bottom: 5px;
    color: #333;
  }

  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`;

const Button = styled.button`
  background-color: #2196f3;
  color: #fff;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #1a73e8;
  }
`;

const ErrorMessage = styled.div`
  color: #ff0000;
  margin-top: 10px;
`;
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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
          const { roleId, customerId } = user;

          document.cookie = `role=${roleId};expires=1;path=/`;

          document.cookie = `customerId=${customerId};expires=1;path=/`;

          document.cookie = `userId=${user.id};expires=1;path=/`;

          login(user);

          navigate(user.roleId === 1 ? "/" : "/");
        } else {
          setError("Invalid credentials");
        }
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An error occurred during login");
    }
  };

  return (
    <PageContainer>

    <LoginContainer>
      <Title>Login</Title>
      <InputContainer>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </InputContainer>
      <InputContainer>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </InputContainer>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Button onClick={handleLogin}>Login</Button>
    </LoginContainer>
    </PageContainer>

  );
};

export default Login;
