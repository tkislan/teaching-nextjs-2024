"use server";

import { redirect } from "next/navigation";
import { assertAuth } from "../../../lib/auth";
import { createDB } from "../../../lib/db";

export async function updateProfile(
  username: string,
  displayName: string | null
) {
  const userId = assertAuth();

  const db = createDB();

  await db
    .updateTable("users")
    .set({ username, displayName })
    .where("id", "=", userId)
    .execute();

  redirect("/profile");
}
