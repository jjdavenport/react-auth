import type { ReactNode } from "react";
import { Link } from "react-router";

type LoginProps = {
  onSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void;
  valueUser: string;
  valuePassword: string;
  onChangeUser: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: {
    username: string;
    password: string;
  };
  onBlurUsername: () => void;
  onBlurPassword: () => void;
};

export const LoginForm = ({
  onSubmit,
  valueUser,
  onChangeUser,
  valuePassword,
  onChangePassword,
  error,
  onBlurPassword,
  onBlurUsername,
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
        <div className="flex flex-col">
          <Input
            onBlur={onBlurUsername}
            error={error.username}
            value={valueUser}
            onChange={onChangeUser}
            type="text"
          />
          {error.username !== "" && <span>{error.username}</span>}
        </div>
        <label htmlFor="password">Password</label>
        <div className="flex flex-col">
          <Input
            onBlur={onBlurPassword}
            error={error.password}
            value={valuePassword}
            onChange={onChangePassword}
            type="password"
          />
          {error.password !== "" && <span>{error.password}</span>}
        </div>
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
  onBlurUsername: () => void;
  onBlurPassword: () => void;
  onBlurConfirmPassword: () => void;
  error: {
    username: string;
    password: string;
    confirmPassword: string;
  };
};

export const SignUp = ({
  onSubmit,
  valueConfirm,
  valuePassword,
  valueUser,
  onChangeConfirm,
  onChangePassword,
  onChangeUser,
  onBlurUsername,
  onBlurPassword,
  onBlurConfirmPassword,
  error,
}: SignUpProps) => {
  return (
    <>
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-4 p-4 outline"
        action="POST"
      >
        <div className="flex justify-between">
          <div>
            <label htmlFor="username">Username</label>
          </div>
          <Link to="/login">Login</Link>
        </div>
        <div className="flex flex-col">
          <Input
            error={error.username}
            onBlur={onBlurUsername}
            value={valueUser}
            onChange={onChangeUser}
            type="text"
          />
          {error.username !== "" && <span>{error.username}</span>}
        </div>
        <label htmlFor="password">Password</label>
        <div className="flex flex-col">
          <Input
            error={error.password}
            onBlur={onBlurPassword}
            value={valuePassword}
            onChange={onChangePassword}
            type="password"
          />
          {error.password !== "" && <span>{error.password}</span>}
        </div>
        <label htmlFor="confirm password">Confirm Password</label>
        <div className="flex flex-col">
          <Input
            error={error.confirmPassword}
            onBlur={onBlurConfirmPassword}
            value={valueConfirm}
            onChange={onChangeConfirm}
            type="password"
          />
          {error.confirmPassword !== "" && <span>{error.confirmPassword}</span>}
        </div>
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
  error: string;
  onBlur: () => void;
};

const Input = ({ type, onChange, value, error, onBlur }: InputProps) => {
  return (
    <>
      <input
        onBlur={onBlur}
        onChange={onChange}
        value={value}
        className={`${error !== "" ? "outline-red-600" : "outline-black"} p-1 outline`}
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
