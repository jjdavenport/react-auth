import type { ReactNode } from "react";
import { Link } from "react-router";

export const LoginForm = () => {
  return (
    <>
      <form className="flex flex-col gap-4 p-4 outline" action="POST">
        <div className="flex justify-between">
          <label htmlFor="username">Username</label>
          <Link to="/register">Sign Up</Link>
        </div>
        <Input type="text" />
        <label htmlFor="password">Password</label>
        <Input type="password" />
        <Button text="Register" type="submit" />
      </form>
    </>
  );
};

export const SignUp = () => {
  return (
    <>
      <form className="flex flex-col gap-4 p-4 outline" action="POST">
        <div className="flex justify-between">
          <label htmlFor="username">Username</label>
          <Link to="/login">Login</Link>
        </div>
        <Input type="text" />
        <label htmlFor="password">Password</label>
        <Input type="password" />
        <label htmlFor="confirm password">Confirm Password</label>
        <Input type="password" />
        <Button text="Register" type="submit" />
      </form>
    </>
  );
};

type ButtonProps = {
  text: string;
  type: "submit";
};

const Button = ({ text, type }: ButtonProps) => {
  return (
    <>
      <button type={type}>{text}</button>
    </>
  );
};

type InputProp = {
  type: string;
};

const Input = ({ type }: InputProp) => {
  return (
    <>
      <input className="p-1 outline" type={type} />
    </>
  );
};

type Prop = {
  children: ReactNode;
};

export const Wrapper = ({ children }: Prop) => {
  return (
    <>
      <div className="min-h-screen p-4">{children}</div>
    </>
  );
};

export const Container = ({ children }: Prop) => {
  return (
    <>
      <main className="flex flex-1 items-center justify-center">
        {children}
      </main>
    </>
  );
};
