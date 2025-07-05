import { useState } from "react";
import { SignUp } from "../components/index";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({
    usernameState: false,
    usernameMessage: "",
    passwordState: false,
    passwordMessage: "",
    confirmPasswordState: false,
    confirmPasswordMessage: "",
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
        body: JSON.stringify({ username, password }),
      });
      if (input === "") {
        setError((prev) => ({
          ...prev,
          usernameState: true,
          usernameMessage: "Username cannot be empty",
        }));
      } else {
        setPassword("");
        setConfirmPassword("");
        setUsername("");
      }
    } catch {
      console.log("error");
    }
  };

  const onBlurPassword = () => {
    if (password === "") {
      setError((prev) => ({
        ...prev,
        passwordState: true,
        passwordMessage: "Password cannot be empty",
      }));
    } else if (password.length < 8) {
      setError((prev) => ({
        ...prev,
        passwordState: true,
        passwordMessage: "Password is too short",
      }));
    } else {
      setError((prev) => ({
        ...prev,
        passwordState: false,
        passwordMessage: "",
      }));
    }
  };

  const onBlurConfirmPassword = () => {
    if (confirmPassword === "") {
      setError((prev) => ({
        ...prev,
        confirmPasswordState: true,
        confirmPasswordMessage: "Confirm password cannot be empty",
      }));
    } else if (confirmPassword.length < 8) {
      setError((prev) => ({
        ...prev,
        confirmPasswordState: true,
        confirmPasswordMessage: "Password is too short",
      }));
    } else if (password !== confirmPassword) {
      setError((prev) => ({
        ...prev,
        confirmPasswordState: true,
        confirmPasswordMessage: "Passwords must match",
      }));
    } else {
      setError((prev) => ({
        ...prev,
        confirmPasswordState: false,
        confirmPasswordMessage: "",
      }));
    }
  };

  const onBlurUsername = () => {
    if (username === "") {
      setError((prev) => ({
        ...prev,
        usernameState: true,
        usernameMessage: "Username cannot be blank",
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
      <SignUp
        error={error}
        onBlurPassword={onBlurPassword}
        onBlurUsername={onBlurUsername}
        onBlurConfirmPassword={onBlurConfirmPassword}
        onChangeUser={(e) => setUsername(e.target.value)}
        onChangePassword={(e) => setPassword(e.target.value)}
        onChangeConfirm={(e) => setConfirmPassword(e.target.value)}
        valueConfirm={confirmPassword}
        valuePassword={password}
        valueUser={username}
        onSubmit={(e) => onSubmit(e, username)}
      />
    </>
  );
};
