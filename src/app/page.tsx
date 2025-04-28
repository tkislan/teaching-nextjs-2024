import Link from "next/link";
import { checkAuth } from "../lib/auth";
import { createDB } from "../lib/db";

export default async function Home() {
  const userId = checkAuth();

  const db = createDB();

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
              {p.photoUrl != null && p.photoUrl.length > 0 ? (
                <img src={p.photoUrl} alt="Post photo" />
              ) : null}
              <p>{new Date(p.createdAt).toString()}</p>
            </Link>
            <Link href={`/user/${p.userId}`}>
              {p.userId}
              {p.userId === userId ? " *" : ""}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
