import { createDB } from "../../../lib/db";
import Link from "next/link";

export default async function UserPosts() {
  const db = createDB();

  const posts = await db
    .selectFrom("posts")
    .selectAll()
    .where("userId", "=", 1)
    .orderBy("createdAt desc")
    .execute();

  return (
    <div>
      {posts.map((p) => (
        <div key={p.id} className="card bg-base-100 w-96 drop-shadow-md">
          <Link href={`/post/${p.id}`}>
            <div className="card-body">
              <p>{p.content}</p>
              <p>{new Date(p.createdAt).toString()}</p>
              <p>{p.userId}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
