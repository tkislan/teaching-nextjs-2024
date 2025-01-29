"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createDB } from "../../../lib/db";

export async function register(
  email: string,
  username: string,
  displayName: string | null,
  password: string
) {
  console.log(`Registering user: ${email}, username: ${username}`);

  const db = createDB();

  // Insert new user
  const result = await db
    .insertInto("users")
    .values({
      email,
      username,
      displayName,
      password,
    })
    .returning("id")
    .executeTakeFirstOrThrow();

  // Set session cookie
  const cookieStore = cookies();
  cookieStore.set("session-user-id", `${result.id}`);

  redirect("/");
}
