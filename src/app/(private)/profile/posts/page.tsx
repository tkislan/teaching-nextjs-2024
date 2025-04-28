import Link from "next/link";
import { assertAuth } from "../../../../lib/auth";
import { createDB } from "../../../../lib/db";

export default async function UserPosts() {
  const db = createDB();

  const userId = assertAuth();

  const posts = await db
    .selectFrom("posts")
    .selectAll()
    .where("userId", "=", userId)
    .orderBy("createdAt desc")
    .execute();

  return (
    <div>
      {posts.map((p) => (
        <div key={p.id} className="card bg-base-100 w-96 drop-shadow-md">
          <Link href={`/post/${p.id}`}>
            <div className="card-body">
              <p>{p.content}</p>
              {p.photoUrl != null && p.photoUrl.length > 0 ? (
                <img src={p.photoUrl} alt="Post photo" />
              ) : null}
              <p>{new Date(p.createdAt).toString()}</p>
              <p>{p.userId}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
