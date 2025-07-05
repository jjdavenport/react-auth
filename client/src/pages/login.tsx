import { useState } from "react";
import { LoginForm } from "../components/index";

export const Login = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState({
    username: "",
    password: "",
  });

  const onSubmit = async () => {
    try {
      await fetch("api/login");
    } catch {}
    setInput({
      username: "",
      password: "",
    });
  };

  const onBlurPassword = () => {
    if (input.password === "") {
      setError((prev) => ({
        ...prev,
        password: "password cannot be blank",
      }));
    } else if (input.password.length < 8) {
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
    if (input.username === "") {
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
        onChangeUser={(e) =>
          setInput((prev) => ({ ...prev, username: e.target.value }))
        }
        onChangePassword={(e) =>
          setInput((prev) => ({ ...prev, password: e.target.value }))
        }
        valueUser={input.username}
        valuePassword={input.password}
        onSubmit={onSubmit}
      />
    </>
  );
};
