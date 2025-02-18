"use server";

import { revalidatePath } from "next/cache";
import { assertAuth } from "../../../../lib/auth";
import { createDB } from "../../../../lib/db";

export async function deleteMessage(id: number, toUserId: number) {
  console.log(`Deleting message id: ${id}`);

  const userId = assertAuth();

  const db = createDB();

  const result = await db
    .deleteFrom("messages")
    .where("id", "=", id)
    .where("fromUserId", "=", userId)
    .where("toUserId", "=", toUserId)
    .execute();

  console.log(result);

  const deletedRows = result.at(0)?.numDeletedRows;

  if (deletedRows != BigInt(1)) {
    throw new Error("Not Found");
  }

  revalidatePath(`/messages/${toUserId}`);
}
