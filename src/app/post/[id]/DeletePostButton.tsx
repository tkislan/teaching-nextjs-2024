"use client";

import { deletePost } from "./delete-post-action";

type Props = {
  id: number;
};

export function DeletePostButton(props: Props) {
  return (
    <button
      className="btn btn-sm"
      onClick={() => {
        console.log("Delete post id:", props.id);
        deletePost(props.id);
      }}
    >
      Delete
    </button>
  );
}
