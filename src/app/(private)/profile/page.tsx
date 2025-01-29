import Link from "next/link";
import { assertAuth } from "../../../lib/auth";
import { createDB } from "../../../lib/db";

export default async function UserProfile() {
  const userId = assertAuth();

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
        <Link href="/profile/edit">Edit Profile</Link>
        <Link href="/profile/change-password">Change Password</Link>
      </div>
    </div>
  );
}
