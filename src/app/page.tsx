import { CamelCasePlugin, Kysely } from "kysely";
import { DB } from "../lib/db-types";
import { dialect } from "../lib/db";
import Link from "next/link";

export default async function Home() {
  const db = new Kysely<DB>({
    dialect: dialect,
    plugins: [new CamelCasePlugin()],
  });

  const posts = await db.selectFrom("posts").selectAll().execute();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {posts.map((p) => (
          <div key={p.id} className="card bg-base-100 w-96 drop-shadow-md">
            <Link href={`/post/${p.id}`}>
              <div className="card-body">
                <p>{p.content}</p>
                <p>{new Date(p.createdAt).toString()}</p>
              </div>
            </Link>
          </div>
        ))}
      </main>
    </div>
  );
}
