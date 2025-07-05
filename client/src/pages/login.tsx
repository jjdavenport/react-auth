import { useState } from "react";
import { LoginForm } from "../components/index";

export const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    username: "",
    password: "",
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
        password: "password cannot be blank",
      }));
    } else if (password.length < 8) {
      setError((prev) => ({
        ...prev,
        password: "password is too short",
      }));
    } else {
      setError((prev) => ({
        ...prev,
        password: "",
      }));
    }
  };

  const onBlurUsername = () => {
    if (username === "") {
      setError((prev) => ({
        ...prev,
        username: "username cannot be blank",
      }));
    } else {
      setError((prev) => ({
        ...prev,
        username: "",
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
