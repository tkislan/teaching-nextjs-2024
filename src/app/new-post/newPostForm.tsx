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
        // e.preventDefault();
        // console.log(e.target[0].value);
        // createPost(e.target[0].value);
      })}
    >
      <textarea
        // id="content"
        {...register("content")}
        className="textarea textarea-bordered"
        placeholder="Text ..."
      ></textarea>
      <input className="btn btn-sm btn-outline" type="submit" value="Create" />
    </form>
  );
}
