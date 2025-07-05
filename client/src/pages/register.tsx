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

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    input: string,
  ) => {
    e.preventDefault();
    try {
      await fetch("/api/register/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ input }),
      });
      if (input === "") {
        setError((prev) => ({
          ...prev,
          username: "Username cannot be empty",
        }));
      } else {
        setInput({
          username: "",
          password: "",
          confirmPassword: "",
        });
      }
    } catch {
      console.log("error");
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

  const onBlurUsername = () => {
    if (input.username === "") {
      setError((prev) => ({
        ...prev,
        username: "Username cannot be blank",
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
      <SignUp
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
        valueConfirm={input.confirmPassword}
        valuePassword={input.password}
        valueUser={input.username}
        onSubmit={(e) => onSubmit(e, input.username)}
      />
    </>
  );
};
