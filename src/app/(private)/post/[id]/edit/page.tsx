import { createDB } from "../../../../../lib/db";
import { EditPostForm } from "./EditPostForm";

type Props = { params: { id: string } };

export default async function EditPostPage(props: Props) {
  console.log("Edit post page:", props.params.id);

  const id = parseInt(props.params.id);

  if (isNaN(id)) {
    return <div>Error: Invalid ID</div>;
  }

  const db = createDB();

  const post = await db
    .selectFrom("posts")
    .selectAll()
    .where("id", "=", id)
    .executeTakeFirst();

  if (post == null) {
    return <div>Error: Post not found</div>;
  }

  console.log(post);

  return (
    <div className="card bg-base-100 w-96 drop-shadow-md">
      <div className="card-body">
        <EditPostForm id={post.id} content={post.content} />
      </div>
    </div>
  );
}
