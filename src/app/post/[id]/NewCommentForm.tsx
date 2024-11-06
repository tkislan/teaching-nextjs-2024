"use client";

import { useForm } from "react-hook-form";
import { createComment } from "./create-comment-action";

type Props = {
  postId: number;
};

interface FormValue {
  content: string;
}

export function NewCommentForm(props: Props) {
  console.log("NewCommentForm", props.postId);

  const { register, handleSubmit, reset } = useForm<FormValue>();

  return (
    <form
      className="grid grid-cols-1"
      onSubmit={handleSubmit(async (data) => {
        console.log(data);
        await createComment(props.postId, data.content);
        reset();
      })}
    >
      <textarea
        {...register("content")}
        className="textarea textarea-bordered"
        placeholder="Text ..."
      ></textarea>
      <input
        className="btn btn-sm btn-outline"
        type="submit"
        value="Add comment"
      />
    </form>
  );
}
