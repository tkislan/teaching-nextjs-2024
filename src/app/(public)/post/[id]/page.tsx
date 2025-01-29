import Link from "next/link";
import { checkAuth } from "../../../../lib/auth";
import { createDB } from "../../../../lib/db";
import { DeletePostButton } from "./DeletePostButton";
import { NewCommentForm } from "./NewCommentForm";

type Props = { params: { id: string } };

export default async function PostDetail(props: Props) {
  console.log(`PostDetail id: ${props.params.id}`);

  const id = parseInt(props.params.id);

  if (isNaN(id)) {
    return <div>Error: Invalid ID</div>;
  }

  const userId = checkAuth();

  const db = createDB();

  const postWithUser = await db
    .selectFrom("posts")
    .innerJoin("users", "posts.userId", "users.id")
    .selectAll("posts")
    .select(["users.displayName", "users.username"])
    .where("posts.id", "=", id)
    .executeTakeFirst();

  if (postWithUser == null) {
    return <div>Error: Post not found</div>;
  }

  const commentsWithUsers = await db
    .selectFrom("comments")
    .innerJoin("users", "comments.userId", "users.id")
    .selectAll("comments")
    .select(["users.displayName", "users.username"])
    .where("postId", "=", postWithUser.id)
    .execute();

  return (
    <div className="card bg-base-100 w-96 drop-shadow-md">
      <div className="card-body">
        <div style={{ whiteSpace: "break-spaces" }}>
          <p>{postWithUser.content}</p>
        </div>
        <p>{new Date(postWithUser.createdAt).toLocaleString()}</p>
        <Link href={`/user/${postWithUser.userId}`}>
          {postWithUser.displayName ?? postWithUser.username}
        </Link>
        {postWithUser.userId === userId ? (
          <div className="flex flex-row gap-4">
            <Link className="btn btn-sm" href={`/post/${postWithUser.id}/edit`}>
              Edit
            </Link>
            <DeletePostButton id={postWithUser.id} />
          </div>
        ) : null}
        <br />
        {commentsWithUsers.length === 0 ? <div>- No Comments - </div> : null}
        <ul className="list-disc">
          {commentsWithUsers.map((c) => (
            <li key={c.id}>
              {c.content}{" "}
              <Link href={`/user/${c.userId}`}>
                [{c.displayName ?? c.username}]
              </Link>
            </li>
          ))}
        </ul>
        {userId != null ? <NewCommentForm postId={postWithUser.id} /> : null}
      </div>
    </div>
  );
}
