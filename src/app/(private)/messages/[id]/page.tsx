import { assertAuth } from "../../../../lib/auth";
import { createDB } from "../../../../lib/db";
import { DeleteMessageButton } from "./DeleteMessageButton";
import { SendMessageForm } from "./SendMessageForm";

type Props = { params: { id: string } };

export default async function MessagesUserPage(props: Props) {
  console.log("Messages with user id:", props.params.id);

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
    .orderBy("createdAt", "asc")
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
            <div className="chat-header">
              <time className="text-xs opacity-50">
                {new Date(m.createdAt).toString()}
              </time>
            </div>
            <div
              className={`chat-bubble ${
                m.fromUserId === userId
                  ? "chat-bubble-info"
                  : "chat-bubble-accent"
              }`}
            >
              {m.message}
            </div>
            {m.fromUserId === userId ? (
              <DeleteMessageButton id={m.id} toUserId={id} />
            ) : null}
          </div>
        ))}
        <SendMessageForm toUserId={id} />
      </div>
    </div>
  );
}
