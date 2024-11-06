"use server";

import { CamelCasePlugin, Kysely } from "kysely";
import { DB } from "../../../lib/db-types";
import { dialect } from "../../../lib/db";
import { revalidatePath } from "next/cache";

export async function createComment(postId: number, content: string) {
  console.log(
    `Creating comment for post id: ${postId}, with content: ${content}`
  );

  const db = new Kysely<DB>({
    dialect: dialect,
    plugins: [new CamelCasePlugin()],
  });

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
