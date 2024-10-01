import { CamelCasePlugin, Kysely } from "kysely";
import { DB } from "../lib/db-types";
import { dialect } from "../lib/db";

async function run() {
  const db = new Kysely<DB>({
    dialect: dialect,
    plugins: [new CamelCasePlugin()],
  });

  const users = await db.selectFrom("users").selectAll().execute();

  for (const user of users) {
    console.log(user.displayName ?? user.username);
  }
}

run();
