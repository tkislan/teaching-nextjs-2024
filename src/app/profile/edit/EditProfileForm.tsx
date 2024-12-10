"use client";

import { useForm } from "react-hook-form";
import { updateProfile } from "./edit-profile-action";

interface Props {
  username: string;
  displayName: string | null;
}

interface FormValues {
  username: string;
  displayName: string | null;
}

export function EditProfileForm(props: Props) {
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: { username: props.username, displayName: props.displayName },
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        updateProfile(data.username, data.displayName);
      })}
    >
      <label className="my-4 input input-bordered flex items-center gap-2">
        Username
        <input
          {...register("username")}
          type="text"
          className="grow"
          placeholder="daisy@site.com"
        />
      </label>
      <label className="my-4 input input-bordered flex items-center gap-2">
        Name
        <input {...register("displayName")} type="text" className="grow" />
      </label>
      <input className="btn btn-sm btn-outline" type="submit" value="Save" />
    </form>
  );
}
