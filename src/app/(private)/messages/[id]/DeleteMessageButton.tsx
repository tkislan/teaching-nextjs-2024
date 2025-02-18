"use client";

import { deleteMessage } from "./delete-message-action";

type Props = {
  id: number;
  toUserId: number;
};

export function DeleteMessageButton(props: Props) {
  return (
    <button
      className="btn btn-circle btn-xs"
      onClick={() => {
        console.log("Delete message id:", props.id);
        deleteMessage(props.id, props.toUserId);
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
}
