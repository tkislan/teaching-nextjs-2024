"use client";

import { useForm } from "react-hook-form";
import { register as registerUser } from "./register-action";

interface FormValues {
  email: string;
  username: string;
  displayName: string;
  password: string;
  confirmPassword: string;
}

export function RegisterForm() {
  const { register, handleSubmit } = useForm<FormValues>();

  return (
    <form
      onSubmit={handleSubmit((data) => {
        if (data.password !== data.confirmPassword) {
          alert("Passwords don't match");
          return;
        }
        registerUser(
          data.email,
          data.username,
          data.displayName,
          data.password
        );
      })}
      className="w-full max-w-md"
    >
      <label className="my-4 input input-bordered flex items-center gap-2">
        Email
        <input
          {...register("email")}
          type="email"
          className="grow"
          placeholder="daisy@site.com"
        />
      </label>

      <label className="my-4 input input-bordered flex items-center gap-2">
        Username
        <input
          {...register("username")}
          type="text"
          className="grow"
          placeholder="username"
        />
      </label>

      <label className="my-4 input input-bordered flex items-center gap-2">
        Display Name
        <input
          {...register("displayName")}
          type="text"
          className="grow"
          placeholder="Display Name"
        />
      </label>

      <label className="my-4 input input-bordered flex items-center gap-2">
        Password
        <input {...register("password")} type="password" className="grow" />
      </label>

      <label className="my-4 input input-bordered flex items-center gap-2">
        Confirm Password
        <input
          {...register("confirmPassword")}
          type="password"
          className="grow"
        />
      </label>

      <input
        className="btn btn-sm btn-outline"
        type="submit"
        value="Register"
      />
    </form>
  );
}
