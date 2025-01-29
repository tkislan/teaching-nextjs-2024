"use client";

import { useForm } from "react-hook-form";
import { login } from "./login-action";

interface FormValues {
  email: string;
  password: string;
}

export function LoginForm() {
  const { register, handleSubmit } = useForm<FormValues>();

  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data.email);
        console.log(data.password);
        login(data.email, data.password);
      })}
    >
      <label className="my-4 input input-bordered flex items-center gap-2">
        Email
        <input
          {...register("email")}
          type="text"
          className="grow"
          placeholder="daisy@site.com"
        />
      </label>
      <label className="my-4 input input-bordered flex items-center gap-2">
        Password
        <input {...register("password")} type="password" className="grow" />
      </label>
      <input className="btn btn-sm btn-outline" type="submit" value="Login" />
    </form>
  );
}
