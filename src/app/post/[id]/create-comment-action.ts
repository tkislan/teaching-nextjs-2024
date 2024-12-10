"use server";

import { revalidatePath } from "next/cache";
import { assertAuth } from "../../../lib/auth";
import { createDB } from "../../../lib/db";

export async function createComment(postId: number, content: string) {
  console.log(
    `Creating comment for post id: ${postId}, with content: ${content}`
  );

  const userId = await assertAuth();

  const db = createDB();

  await db
    .insertInto("comments")
    .values({
      postId: postId,
      userId,
      content: content,
      createdAt: new Date().getTime(),
    })
    .execute();

  revalidatePath(`/post/${postId}`);
}
