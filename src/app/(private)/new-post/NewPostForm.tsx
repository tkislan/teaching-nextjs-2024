"use client";

import { useForm } from "react-hook-form";

import { createPost } from "./create-post-action";

interface FormValues {
  content: string;
  photoUrl: string | null;
}

export function NewPostForm() {
  const { register, watch, handleSubmit } = useForm<FormValues>();

  const photoUrl = watch("photoUrl");

  return (
    <form
      className="grid grid-cols-1"
      onSubmit={handleSubmit((data) => {
        console.log(data);
        createPost(data.content, data.photoUrl);
      })}
    >
      <textarea
        {...register("content")}
        className="textarea textarea-bordered"
        placeholder="Text ..."
      ></textarea>
      <input className="input input-bordered" {...register("photoUrl")} />
      {photoUrl != null && photoUrl.length > 0 ? (
        <img src={photoUrl} alt="Post photo" />
      ) : null}
      <input className="btn btn-sm btn-outline" type="submit" value="Create" />
    </form>
  );
}
