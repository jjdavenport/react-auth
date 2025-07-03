import { useState } from "react";
import { LoginForm } from "../components/index";

export const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async () => {
    try {
      await fetch("api/login");
    } catch {}
    setUserName("");
    setPassword("");
  };
  return (
    <>
      <LoginForm
        onChangeUser={(e) => setUserName(e.target.value)}
        onChangePassword={(e) => setPassword(e.target.value)}
        valueUser={username}
        valuePassword={password}
        onSubmit={onSubmit}
      />
    </>
  );
};
