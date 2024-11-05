"use client";

import { useForm } from "react-hook-form";

import { createPost } from "./create-post-action";

interface FormValue {
  content: string;
}

export function NewPostForm() {
  const { register, handleSubmit } = useForm<FormValue>();

  return (
    <form
      className="grid grid-cols-1"
      onSubmit={handleSubmit((data) => {
        console.log(data);
        createPost(data.content);
      })}
    >
      <textarea
        {...register("content")}
        className="textarea textarea-bordered"
        placeholder="Text ..."
      ></textarea>
      <input className="btn btn-sm btn-outline" type="submit" value="Create" />
    </form>
  );
}
