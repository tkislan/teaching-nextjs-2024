"use server";

import { redirect } from "next/navigation";
import { assertAuth } from "../../../../lib/auth";
import { createDB } from "../../../../lib/db";

export async function deletePost(id: number) {
  console.log("Deleting post with id:", id);

  const userId = assertAuth();

  const db = createDB();

  await db.transaction().execute(async (trx) => {
    await trx.deleteFrom("comments").where("postId", "=", id).execute();
    const result = await trx
      .deleteFrom("posts")
      .where("id", "=", id)
      .where("userId", "=", userId)
      .execute();

    console.log(result);

    const deletedRows = result.at(0)?.numDeletedRows;

    if (deletedRows != BigInt(1)) {
      throw new Error("Not Found");
    }
  });

  redirect("/");
}
