"use server";

import { redirect } from "next/navigation";
import { assertAuth } from "../../../lib/auth";
import { createDB } from "../../../lib/db";

export async function createPost(content: string, photoUrl: string | null) {
  console.log(`Creating post with text: ${content}`);

  const userId = assertAuth();

  const db = createDB();

  const newPost = await db
    .insertInto("posts")
    .values({
      userId,
      content: content,
      photoUrl: photoUrl,
      createdAt: new Date().getTime(),
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  console.log(newPost);

  redirect(`/post/${newPost.id}`);
}
