"use client";

import { useForm } from "react-hook-form";
import { updatePost } from "./update-post-action";

type Props = {
  id: number;
  content: string;
  photoUrl: string | null;
};

type FormValues = {
  content: string;
  photoUrl: string | null;
};

export function EditPostForm(props: Props) {
  const { register, watch, handleSubmit } = useForm<FormValues>({
    defaultValues: { content: props.content, photoUrl: props.photoUrl },
  });

  const photoUrl = watch("photoUrl");
  console.log("photoUrl", photoUrl);

  return (
    <form
      className="grid grid-cols-1"
      onSubmit={handleSubmit((data) => {
        console.log(data);
        updatePost(props.id, data.content, data.photoUrl);
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
      <input className="btn btn-sm btn-outline" type="submit" value="Update" />
    </form>
  );
}
