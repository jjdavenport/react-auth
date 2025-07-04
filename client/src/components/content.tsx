import type { ReactNode } from "react";
import { Link } from "react-router";

type LoginProps = {
  onSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void;
  valueUser: string;
  valuePassword: string;
  onChangeUser: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorUsername: {
    state: boolean;
    message: string;
  };
  errorPassword: {
    state: boolean;
    message: string;
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
  errorUsername,
  errorPassword,
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
            error={errorUsername.state}
            value={valueUser}
            onChange={onChangeUser}
            type="text"
          />
          {errorUsername.state && <span>{errorUsername.message}</span>}
        </div>
        <label htmlFor="password">Password</label>
        <div className="flex flex-col">
          <Input
            onBlur={onBlurPassword}
            error={errorPassword.state}
            value={valuePassword}
            onChange={onChangePassword}
            type="password"
          />
          {errorPassword.state && <span>{errorPassword.message}</span>}
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
  errorUsername: {
    state: boolean;
    message: string;
  };
  errorPassword: {
    state: boolean;
    message: string;
  };
  errorConfirmPassword: {
    state: boolean;
    message: string;
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
  errorUsername,
  errorPassword,
  errorConfirmPassword,
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
            error={errorUsername.state}
            onBlur={onBlurUsername}
            value={valueUser}
            onChange={onChangeUser}
            type="text"
          />
          {errorUsername.state && <span>{errorUsername.message}</span>}
        </div>
        <label htmlFor="password">Password</label>
        <div className="flex flex-col">
          <Input
            error={errorPassword.state}
            onBlur={onBlurPassword}
            value={valuePassword}
            onChange={onChangePassword}
            type="password"
          />
          {errorPassword.state && <span>{errorPassword.message}</span>}
        </div>
        <label htmlFor="confirm password">Confirm Password</label>
        <div className="flex flex-col">
          <Input
            error={errorConfirmPassword.state}
            onBlur={onBlurConfirmPassword}
            value={valueConfirm}
            onChange={onChangeConfirm}
            type="password"
          />
          {errorConfirmPassword.state && (
            <span>{errorConfirmPassword.message}</span>
          )}
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
  error: boolean;
  onBlur: () => void;
};

const Input = ({ type, onChange, value, error, onBlur }: InputProps) => {
  return (
    <>
      <input
        onBlur={onBlur}
        onChange={onChange}
        value={value}
        className={`${error ? "outline-red-600" : "outline-black"} p-1 outline`}
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
