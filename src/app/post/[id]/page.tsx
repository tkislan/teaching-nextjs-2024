import { CamelCasePlugin, Kysely } from "kysely";
import { DB } from "../../../lib/db-types";
import { dialect } from "../../../lib/db";

type Props = { params: { id: string } };

export default async function PostDetail(props: Props) {
  console.log(`PostDetail id: ${props.params.id}`);

  const id = parseInt(props.params.id);

  if (isNaN(id)) {
    return <div>Error: Invalid ID</div>;
  }

  const db = new Kysely<DB>({
    dialect: dialect,
    plugins: [new CamelCasePlugin()],
  });

  const post = await db
    .selectFrom("posts")
    .selectAll()
    .where("id", "=", id)
    .executeTakeFirst();

  if (post == null) {
    return <div>Error: Post not found</div>;
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 sm:items-start">
        <div key={post.id} className="card bg-base-100 w-96 drop-shadow-md">
          <div className="card-body">
            <p>{post.content}</p>
            <p>{new Date(post.createdAt).toLocaleString()}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
