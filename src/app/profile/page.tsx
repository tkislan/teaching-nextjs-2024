import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createDB } from "../../lib/db";

export default async function UserProfile() {
  const cookieStore = cookies();

  const sessionUserId = cookieStore.get("session-user-id");

  console.log("Session user id:", sessionUserId);

  if (sessionUserId == null) {
    redirect("/login");
  }

  const userId = parseInt(sessionUserId.value);

  if (isNaN(userId)) {
    redirect("/login");
  }

  const db = createDB();

  const user = await db
    .selectFrom("users")
    .selectAll()
    .where("id", "=", userId)
    .executeTakeFirstOrThrow();

  return (
    <div className="card bg-base-100 w-96 drop-shadow-md">
      <div className="card-body">
        <p>{user.id}</p>
        <p>{user.email}</p>
        <p>{user.username}</p>
        <p>{user.displayName}</p>
        <Link href="/profile/posts">My Posts</Link>
      </div>
    </div>
  );
}
