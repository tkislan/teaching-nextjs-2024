// WITH message_users AS (
//   SELECT to_user_id AS user_id,
//     MAX(created_at) AS max_created_at
//   FROM messages
//   WHERE from_user_id = 1
//   GROUP BY from_user_id,
//     to_user_id
//   UNION
//   SELECT from_user_id AS user_id,
//     MAX(created_at) AS max_created_at
//   FROM messages
//   WHERE to_user_id = 1
//   GROUP BY from_user_id,
//     to_user_id
// )
// SELECT u.id,
//   u.username,
//   MAX(max_created_at)
// FROM message_users
//   INNER JOIN users u ON message_users.user_id = u.id
// GROUP BY u.id,
//   u.username
// ORDER BY MAX(max_created_at) DESC;

import Link from "next/link";
import { assertAuth } from "../../../lib/auth";
import { createDB } from "../../../lib/db";

export default async function Messages() {
  const userId = assertAuth();

  const db = createDB();

  const messageUsers = await db
    .with("messageUsers", (db) =>
      db
        .selectFrom("messages")
        .select((eb) => [
          "toUserId as userId",
          eb.fn.max("createdAt").as("maxCreatedAt"),
        ])
        .where("fromUserId", "=", userId)
        .groupBy(["fromUserId", "toUserId"])
        .union(
          db
            .selectFrom("messages")
            .select((eb) => [
              "fromUserId as userId",
              eb.fn.max("createdAt").as("maxCreatedAt"),
            ])
            .where("toUserId", "=", userId)
            .groupBy(["fromUserId", "toUserId"])
        )
    )
    .selectFrom("messageUsers")
    .innerJoin("users", "messageUsers.userId", "users.id")
    .select((eb) => [
      "users.id",
      "users.username",
      "users.displayName",
      eb.fn.max("maxCreatedAt").as("maxCreatedAt"),
    ])
    .groupBy(["users.id", "users.username", "users.displayName"])
    .orderBy((eb) => eb.fn.max("maxCreatedAt"), "desc")
    .execute();

  return (
    <div className="card bg-base-100 drop-shadow-md">
      <div className="card-body">
        Message
        <div>
          {messageUsers.map((r) => (
            <Link key={r.id} href={`/messages/${r.id}`}>
              <div className="w-96 flex flex-row items-center m-2 p-2 space-x-4 hover:bg-gray-200">
                <div>{r.id}</div>
                <div className="flex flex-col">
                  <div>{r.displayName ?? r.username}</div>
                  <div>{new Date(r.maxCreatedAt).toLocaleString()}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
