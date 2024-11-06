import { createDB } from "../lib/db";

async function run() {
  const db = createDB();

  const users = await db.selectFrom("users").selectAll().execute();

  for (const user of users) {
    console.log(user.displayName ?? user.username);
  }
}

run();
