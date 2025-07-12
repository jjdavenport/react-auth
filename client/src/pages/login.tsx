import { useState } from "react";
import { LoginForm } from "../components/index";
import { useNavigate } from "react-router";

export const Login = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  type Errors = {
    username?: string;
    password?: string;
  };

  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(
      "https://react-auth-hlgr.onrender.com/api/login/check-username/",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username: input.username }),
      },
    );

    const { exists } = await response.json();

    const errors: Errors = {};

    if (input.username === "") {
      errors.username = "username cannot be blank";
    } else if (!exists) {
      errors.username = "username does not exist";
    }

    if (input.password === "") {
      errors.password = "Password cannot be blank";
    } else if (input.password.length < 8) {
      errors.password = "Password is too short";
    }

    if (Object.keys(errors).length > 0) {
      setError((prev) => ({ ...prev, ...errors }));
      return;
    }

    try {
      const response = await fetch(
        "https://react-auth-hlgr.onrender.com/api/login/",
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            username: input.username,
            password: input.password,
          }),
        },
      );

      if (!response.ok) {
        if (response.status === 401) {
          setError((prev) => ({ ...prev, password: "incorrect password" }));
        }
      } else {
        setInput({
          username: "",
          password: "",
        });
        navigate("/home");
      }
    } catch {
      setError({
        username: "server error",
        password: "server error",
      });
    }
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

  const onBlurUsername = async () => {
    const response = await fetch(
      "https://react-auth-hlgr.onrender.com/api/login/check-username",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ username: input.username }),
      },
    );

    const { exists } = await response.json();

    if (input.username === "") {
      setError((prev) => ({
        ...prev,
        username: "username cannot be blank",
      }));
    } else if (!exists) {
      setError((prev) => ({ ...prev, username: "username does not exist" }));
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
        input={input}
        onSubmit={onSubmit}
      />
    </>
  );
};
