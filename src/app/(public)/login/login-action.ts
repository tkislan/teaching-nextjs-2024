"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createDB } from "../../../lib/db";

export async function login(email: string, password: string) {
  console.log(`Logging in user: ${email}, with password: ${password}`);

  const db = createDB();

  const user = await db
    .selectFrom("users")
    .selectAll()
    .where("email", "=", email)
    .executeTakeFirst();

  if (user == null) {
    throw new Error("User not found");
  }

  if (password !== user.password) {
    throw new Error("Invalid password");
  }

  const cookieStore = cookies();

  cookieStore.set("session-user-id", `${user.id}`);

  redirect("/");
}
