"use server";

import { createDB } from "../../../lib/db";
import { revalidatePath } from "next/cache";

export async function createComment(postId: number, content: string) {
  console.log(
    `Creating comment for post id: ${postId}, with content: ${content}`
  );

  const db = createDB();

  await db
    .insertInto("comments")
    .values({
      postId: postId,
      userId: 1,
      content: content,
      createdAt: new Date().getTime(),
    })
    .execute();

  revalidatePath(`/post/${postId}`);
}
