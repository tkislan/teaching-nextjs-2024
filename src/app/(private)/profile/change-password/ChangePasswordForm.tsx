"use client";

import { useForm } from "react-hook-form";
import { changePassword } from "./change-password-action";

interface FormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export function ChangePasswordForm() {
  const { register, handleSubmit } = useForm<FormValues>();

  return (
    <form
      onSubmit={handleSubmit((data) => {
        if (data.newPassword !== data.confirmPassword) {
          alert("Passwords don't match");
          return;
        }
        changePassword(data.currentPassword, data.newPassword);
      })}
    >
      <label className="my-4 input input-bordered flex items-center gap-2">
        Current Password
        <input
          {...register("currentPassword")}
          type="password"
          className="grow"
        />
      </label>
      <label className="my-4 input input-bordered flex items-center gap-2">
        New Password
        <input {...register("newPassword")} type="password" className="grow" />
      </label>
      <label className="my-4 input input-bordered flex items-center gap-2">
        New Password Confirm
        <input
          {...register("confirmPassword")}
          type="password"
          className="grow"
        />
      </label>
      <input
        className="btn btn-sm btn-outline"
        type="submit"
        value="Change Password"
      />
    </form>
  );
}
