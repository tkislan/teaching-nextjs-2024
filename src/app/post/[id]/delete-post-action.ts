"use server";

import { redirect } from "next/navigation";
import { createDB } from "../../../lib/db";

export async function deletePost(id: number) {
  console.log("Deleting post with id:", id);

  const db = createDB();

  await db.transaction().execute(async (trx) => {
    await trx.deleteFrom("comments").where("postId", "=", id).execute();
    await trx.deleteFrom("posts").where("id", "=", id).execute();
  });

  redirect("/");
}
