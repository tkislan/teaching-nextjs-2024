"use server";

import { createDB } from "../../lib/db";
import { redirect } from "next/navigation";

export async function createPost(content: string) {
  console.log(`Creating post with text: ${content}`);

  const db = createDB();

  const newPost = await db
    .insertInto("posts")
    .values({
      userId: 1,
      content: content,
      createdAt: new Date().getTime(),
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  console.log(newPost);

  redirect(`/post/${newPost.id}`);
}
