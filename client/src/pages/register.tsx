import { useState } from "react";
import { SignUp } from "../components/index";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorUsername, setErrorUsername] = useState({
    state: false,
    message: "",
  });
  const [errorPassword, setErrorPassword] = useState({
    state: false,
    message: "",
  });
  const [errorConfirmPassword, setErrorConfirmPassword] = useState({
    state: false,
    message: "",
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
      if (username === usernames) {
        setErrorUsername((prev) => ({
          ...prev,
          state: true,
          message: "Username is taken",
        }));
      } else if (input === "") {
        setErrorUsername((prev) => ({
          ...prev,
          state: true,
          message: "Username cannot be empty",
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
      setErrorPassword((prev) => ({
        ...prev,
        state: true,
        message: "Password cannot be empty",
      }));
    } else if (password.length < 8) {
      setErrorPassword((prev) => ({
        ...prev,
        state: true,
        message: "Password is too short",
      }));
    } else {
      setErrorPassword((prev) => ({
        ...prev,
        state: false,
        message: "",
      }));
    }
  };

  const onBlurConfirmPassword = () => {
    if (confirmPassword === "") {
      setErrorConfirmPassword((prev) => ({
        ...prev,
        state: true,
        message: "Confirm password cannot be empty",
      }));
    } else if (confirmPassword.length < 8) {
      setErrorConfirmPassword((prev) => ({
        ...prev,
        state: true,
        message: "Password is too short",
      }));
    } else if (password !== confirmPassword) {
      setErrorConfirmPassword((prev) => ({
        ...prev,
        state: true,
        message: "Passwords must match",
      }));
    } else {
      setErrorConfirmPassword((prev) => ({
        ...prev,
        state: false,
        message: "",
      }));
    }
  };

  const onBlurUsername = () => {
    if (username === usernames) {
      setErrorUsername((prev) => ({
        ...prev,
        state: true,
        message: "Username is taken",
      }));
    } else if (username === "") {
      setErrorUsername((prev) => ({
        ...prev,
        state: true,
        message: "Username cannot be blank",
      }));
    } else {
      setErrorUsername((prev) => ({
        ...prev,
        state: false,
        message: "",
      }));
    }
  };

  return (
    <>
      <SignUp
        errorUsername={errorUsername}
        errorPassword={errorPassword}
        errorConfirmPassword={errorConfirmPassword}
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
