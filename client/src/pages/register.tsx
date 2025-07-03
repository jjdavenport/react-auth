import { useState } from "react";
import { SignUp } from "../components/index";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await fetch("/api/register/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
    } catch {
      console.log("error");
    }
  };
  return (
    <>
      <SignUp
        onChangeUser={(e) => setUsername(e.target.value)}
        onChangePassword={(e) => setPassword(e.target.value)}
        onChangeConfirm={(e) => setConfirmPassword(e.target.value)}
        valueConfirm={confirmPassword}
        valuePassword={password}
        valueUser={username}
        onSubmit={onSubmit}
      />
    </>
  );
};
