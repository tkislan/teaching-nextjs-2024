import { CamelCasePlugin, Kysely } from "kysely";
import { DB } from "../lib/db-types";
import { dialect } from "../lib/db";
import Link from "next/link";

export default async function Home() {
  const db = new Kysely<DB>({
    dialect: dialect,
    plugins: [new CamelCasePlugin()],
  });

  const posts = await db
    .selectFrom("posts")
    .selectAll()
    .orderBy("createdAt desc")
    .execute();

  return (
    <div>
      {posts.map((p) => (
        <div key={p.id} className="card bg-base-100 w-96 drop-shadow-md">
          <div className="card-body">
            <Link href={`/post/${p.id}`}>
              <p>{p.content}</p>
              <p>{new Date(p.createdAt).toString()}</p>
            </Link>
            <Link href={`/user/${p.userId}`}>
              {p.userId}
              {p.userId === 1 ? " *" : ""}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
