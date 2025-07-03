import type { ReactNode } from "react";
import { Link } from "react-router";

type LoginProps = {
  onSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void;
  valueUser: string;
  valuePassword: string;
  onChangeUser: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const LoginForm = ({
  onSubmit,
  valueUser,
  onChangeUser,
  valuePassword,
  onChangePassword,
}: LoginProps) => {
  return (
    <>
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-4 p-4 outline"
        action="POST"
      >
        <div className="flex justify-between">
          <label htmlFor="username">Username</label>
          <Link to="/register">Sign Up</Link>
        </div>
        <Input value={valueUser} onChange={onChangeUser} type="text" />
        <label htmlFor="password">Password</label>
        <Input
          value={valuePassword}
          onChange={onChangePassword}
          type="password"
        />
        <Button text="Register" type="submit" />
      </form>
    </>
  );
};

type SignUpProps = {
  onSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void;
  valueConfirm: string;
  valuePassword: string;
  valueUser: string;
  onChangeConfirm: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeUser: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const SignUp = ({
  onSubmit,
  valueConfirm,
  valuePassword,
  valueUser,
  onChangeConfirm,
  onChangePassword,
  onChangeUser,
}: SignUpProps) => {
  return (
    <>
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-4 p-4 outline"
        action="POST"
      >
        <div className="flex justify-between">
          <label htmlFor="username">Username</label>
          <Link to="/login">Login</Link>
        </div>
        <Input value={valueUser} onChange={onChangeUser} type="text" />
        <label htmlFor="password">Password</label>
        <Input
          value={valuePassword}
          onChange={onChangePassword}
          type="password"
        />
        <label htmlFor="confirm password">Confirm Password</label>
        <Input
          value={valueConfirm}
          onChange={onChangeConfirm}
          type="password"
        />
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

type InputProps = {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({ type, onChange, value }: InputProps) => {
  return (
    <>
      <input
        onChange={onChange}
        value={value}
        className="p-1 outline"
        type={type}
      />
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
