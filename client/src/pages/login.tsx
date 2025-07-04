import { useState } from "react";
import { LoginForm } from "../components/index";

export const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState({
    state: false,
    message: "",
  });
  const [passwordError, setPasswordError] = useState({
    state: false,
    message: "",
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
      setPasswordError((prev) => ({
        ...prev,
        state: true,
        message: "password cannot be blank",
      }));
    } else if (password.length < 8) {
      setPasswordError((prev) => ({
        ...prev,
        state: true,
        message: "password is too short",
      }));
    } else {
      setPasswordError((prev) => ({
        ...prev,
        state: false,
        message: "",
      }));
    }
  };

  const onBlurUsername = () => {
    if (username === "") {
      setUsernameError((prev) => ({
        ...prev,
        state: true,
        message: "username cannot be blank",
      }));
    } else {
      setUsernameError((prev) => ({
        ...prev,
        state: false,
        message: "",
      }));
    }
  };

  return (
    <>
      <LoginForm
        onBlurUsername={onBlurUsername}
        onBlurPassword={onBlurPassword}
        errorUsername={usernameError}
        errorPassword={passwordError}
        onChangeUser={(e) => setUserName(e.target.value)}
        onChangePassword={(e) => setPassword(e.target.value)}
        valueUser={username}
        valuePassword={password}
        onSubmit={onSubmit}
      />
    </>
  );
};
