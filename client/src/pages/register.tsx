import { useState } from "react";
import { SignUp } from "../components/index";

export const Register = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  type Errors = {
    username?: string;
    password?: string;
    confirmPassword?: string;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(
      "https://react-auth-hlgr.onrender.com/api/register/check-username/",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ username: input.username }),
      },
    );
    const { available } = await response.json();

    const errors: Errors = {};

    if (input.username === "") {
      errors.username = "username cannot be blank";
    } else if (!available) {
      errors.username = "username is taken";
    }

    if (input.password === "") {
      errors.password = "password cannot be blank";
    } else if (input.password.length < 8) {
      errors.password = "Password is too short";
    }

    if (input.confirmPassword === "") {
      errors.confirmPassword = "Password cannot be blank";
    } else if (input.confirmPassword.length < 8) {
      errors.confirmPassword = "password is too short";
    }

    if (input.password !== input.confirmPassword) {
      errors.password = "Passwords must match";
      errors.confirmPassword = "Passwords must match";
    }

    if (Object.keys(errors).length > 0) {
      setError((prev) => ({ ...prev, ...errors }));
      return;
    }

    try {
      await fetch("https://react-auth-hlgr.onrender.com/api/register/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          username: input.username,
          password: input.password,
          confirmPassword: input.confirmPassword,
        }),
      });
      setInput({
        username: "",
        password: "",
        confirmPassword: "",
      });
    } catch {
      setError({
        username: "sever error",
        password: "server error",
        confirmPassword: "server error",
      });
    }
  };

  const onBlurPassword = () => {
    if (input.password === "") {
      setError((prev) => ({
        ...prev,
        password: "Password cannot be empty",
      }));
    } else if (input.password.length < 8) {
      setError((prev) => ({
        ...prev,
        password: "Password is too short",
      }));
    } else {
      setError((prev) => ({
        ...prev,
        password: "",
      }));
    }
  };

  const onBlurConfirmPassword = () => {
    if (input.confirmPassword === "") {
      setError((prev) => ({
        ...prev,
        confirmPassword: "Confirm password cannot be empty",
      }));
    } else if (input.confirmPassword.length < 8) {
      setError((prev) => ({
        ...prev,
        confirmPassword: "Password is too short",
      }));
    } else if (input.password !== input.confirmPassword) {
      setError((prev) => ({
        ...prev,
        confirmPassword: "Passwords must match",
      }));
    } else {
      setError((prev) => ({
        ...prev,
        confirmPassword: "",
      }));
    }
  };

  const onBlurUsername = async () => {
    const response = await fetch(
      "https://react-auth-hlgr.onrender.com/api/register/check-username",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ username: input.username }),
      },
    );
    const { available } = await response.json();
    if (input.username === "") {
      setError((prev) => ({
        ...prev,
        username: "Username cannot be blank",
      }));
    } else if (!available) {
      setError((prev) => ({ ...prev, username: "username is taken" }));
    } else {
      setError((prev) => ({
        ...prev,
        username: "",
      }));
    }
  };

  return (
    <>
      <SignUp
        input={input}
        error={error}
        onBlurPassword={onBlurPassword}
        onBlurUsername={onBlurUsername}
        onBlurConfirmPassword={onBlurConfirmPassword}
        onChangeUser={(e) =>
          setInput((prev) => ({ ...prev, username: e.target.value }))
        }
        onChangePassword={(e) =>
          setInput((prev) => ({ ...prev, password: e.target.value }))
        }
        onChangeConfirm={(e) =>
          setInput((prev) => ({ ...prev, confirmPassword: e.target.value }))
        }
        onSubmit={onSubmit}
      />
    </>
  );
};
