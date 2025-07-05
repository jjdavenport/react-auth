import { useState } from "react";
import { LoginForm } from "../components/index";

export const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    usernameState: false,
    usernameMessage: "",
    passwordState: false,
    passwordMessage: "",
  });

  const onSubmit = async () => {
    try {
      await fetch("api/login");
    } catch {}
    setUserName("");
    setPassword("");
  };

  const onBlurPassword = () => {
    if (password === "") {
      setError((prev) => ({
        ...prev,
        passwordState: true,
        passwordMessage: "password cannot be blank",
      }));
    } else if (password.length < 8) {
      setError((prev) => ({
        ...prev,
        passwordState: true,
        passwordMessage: "password is too short",
      }));
    } else {
      setError((prev) => ({
        ...prev,
        passwordState: false,
        passwordMessage: "",
      }));
    }
  };

  const onBlurUsername = () => {
    if (username === "") {
      setError((prev) => ({
        ...prev,
        usernameState: true,
        usernameMessage: "username cannot be blank",
      }));
    } else {
      setError((prev) => ({
        ...prev,
        usernameState: false,
        usernameMessage: "",
      }));
    }
  };

  return (
    <>
      <LoginForm
        onBlurUsername={onBlurUsername}
        onBlurPassword={onBlurPassword}
        error={error}
        onChangeUser={(e) => setUserName(e.target.value)}
        onChangePassword={(e) => setPassword(e.target.value)}
        valueUser={username}
        valuePassword={password}
        onSubmit={onSubmit}
      />
    </>
  );
};
