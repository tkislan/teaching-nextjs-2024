"use server";

import { CamelCasePlugin, Kysely } from "kysely";
import { DB } from "../../../lib/db-types";
import { dialect } from "../../../lib/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createComment(content: string, postId: number) {
  console.log(`Creating post with text: ${content}`);

  const db = new Kysely<DB>({
    dialect: dialect,
    plugins: [new CamelCasePlugin()],
  });

  const newPost = await db
    .insertInto("comments")
    .values({
      userId: 1,
      postId: postId,
      content: content,
      createdAt: new Date().getTime(),
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  console.log(newPost);

  revalidatePath("/post/${postId}"); //refresh
}
