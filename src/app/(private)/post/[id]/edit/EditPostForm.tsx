"use client";

import { useForm } from "react-hook-form";
import { updatePost } from "./update-post-action";

type Props = {
  id: number;
  content: string;
};

type FormValues = {
  content: string;
};

export function EditPostForm(props: Props) {
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: { content: props.content },
  });

  return (
    <form
      className="grid grid-cols-1"
      onSubmit={handleSubmit((data) => {
        console.log(data);
        updatePost(props.id, data.content);
      })}
    >
      <textarea
        {...register("content")}
        className="textarea textarea-bordered"
        placeholder="Text ..."
      ></textarea>
      <input className="btn btn-sm btn-outline" type="submit" value="Update" />
    </form>
  );
}
