import { createDB } from "../../../../lib/db";

type Props = { params: { id: string } };

export default async function PostDetail(props: Props) {
  console.log(`PostDetail id: ${props.params.id}`);

  const id = parseInt(props.params.id);

  if (isNaN(id)) {
    return <div>Error: Invalid ID</div>;
  }

  console.log(id);

  const db = createDB();

  const user = await db
    .selectFrom("users")
    .selectAll()
    .where("id", "=", id)
    .executeTakeFirst();

  if (user == null) {
    return <div>Error: User not found</div>;
  }

  return (
    <div className="card bg-base-100 w-96 drop-shadow-md">
      <div className="card-body">
        <p>{user.id}</p>
        <p>{user.email}</p>
        <p>{user.username}</p>
        <p>{user.displayName}</p>
      </div>
    </div>
  );
}
