"use server";

import { redirect } from "next/navigation";
import { assertAuth } from "../../../lib/auth";
import { createDB } from "../../../lib/db";

export async function changePassword(
  currentPassword: string,
  newPassword: string
) {
  const userId = assertAuth();

  const db = createDB();

  const user = await db
    .selectFrom("users")
    .selectAll()
    .where("id", "=", userId)
    .executeTakeFirstOrThrow();

  if (user.password != currentPassword) {
    throw new Error("Invalid password");
  }

  await db
    .updateTable("users")
    .set({ password: newPassword })
    .where("id", "=", userId)
    .execute();

  redirect("/profile");
}
