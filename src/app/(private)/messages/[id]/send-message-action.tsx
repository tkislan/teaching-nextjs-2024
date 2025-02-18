"use server";

import { revalidatePath } from "next/cache";
import { assertAuth } from "../../../../lib/auth";
import { createDB } from "../../../../lib/db";

export async function sendMessage(toUserId: number, message: string) {
  console.log(
    `Sending message to user id: ${toUserId}, with message: ${message}`
  );

  const userId = assertAuth();

  const db = createDB();

  await db
    .insertInto("messages")
    .values({
      fromUserId: userId,
      toUserId,
      message: message,
      createdAt: new Date().getTime(),
    })
    .execute();

  revalidatePath(`/messages/${toUserId}`);
}
