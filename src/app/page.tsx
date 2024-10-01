import { CamelCasePlugin, Kysely } from "kysely";
import { DB } from "../lib/db-types";
import { dialect } from "../lib/db";

export default async function Home() {
  const db = new Kysely<DB>({
    dialect: dialect,
    plugins: [new CamelCasePlugin()],
  });

  const users = await db.selectFrom("users").selectAll().execute();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {users.map((u) => (
          <li key={u.id}>{u.displayName ?? u.username}</li>
        ))}
      </main>
    </div>
  );
}
