"use client";

import { useForm } from "react-hook-form";
import { sendMessage } from "./send-message-action";

type Props = {
  toUserId: number;
};

interface FormValue {
  message: string;
}

export function SendMessageForm(props: Props) {
  console.log("SendMessageForm", props.toUserId);

  const { register, handleSubmit, reset } = useForm<FormValue>();

  return (
    <form
      className="grid grid-cols-1"
      onSubmit={handleSubmit(async (data) => {
        console.log(data);
        await sendMessage(props.toUserId, data.message);
        reset();
      })}
    >
      <textarea
        {...register("message")}
        className="textarea textarea-bordered"
        placeholder="Text ..."
      ></textarea>
      <input
        className="btn btn-sm btn-outline"
        type="submit"
        value="Send message"
      />
    </form>
  );
}
