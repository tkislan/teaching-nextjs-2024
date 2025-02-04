import { assertAuth } from "../../../../lib/auth";
import { createDB } from "../../../../lib/db";

type Props = { params: { id: string } };

export default async function MessagesUserPage(props: Props) {
  console.log("Edit post page:", props.params.id);

  const id = parseInt(props.params.id);

  if (isNaN(id)) {
    return <div>Error: Invalid ID</div>;
  }

  const userId = assertAuth();

  const db = createDB();

  const messages = await db
    .selectFrom("messages")
    .selectAll()
    .where((eb) =>
      eb.or([
        eb.and([eb("fromUserId", "=", userId), eb("toUserId", "=", id)]),
        eb.and([eb("toUserId", "=", userId), eb("fromUserId", "=", id)]),
      ])
    )
    .orderBy("createdAt", "desc")
    .execute();

  return (
    <div className="card bg-base-100 drop-shadow-md">
      <div className="card-body">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`chat ${
              m.fromUserId === userId ? "chat-end" : "chat-start"
            }`}
          >
            <div className="chat-bubble chat-bubble-accent">{m.message}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
