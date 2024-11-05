"use client";

import { useForm } from "react-hook-form";
import { createComment } from "./crete-comment-action";

interface FormValue {
  content: string;
}

interface NewCommentFormProps {
  postId: number; // Define postId as a number type
}

export function NewCommentForm({ postId }: NewCommentFormProps) {
  const { register, handleSubmit } = useForm<FormValue>();

  return (
    <form
      className="grid grid-cols-1"
      onSubmit={handleSubmit((data) => {
        console.log(data);
        createComment(data.content, postId);
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
      <input
        className="btn btn-sm btn-outline"
        type="submit"
        value="Add Comment"
      />
    </form>
  );
}
