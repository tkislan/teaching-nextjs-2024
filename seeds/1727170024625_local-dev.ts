import type { Kysely } from "kysely";
import { faker } from "@faker-js/faker";
import { DB } from "../src/lib/db-types";

export async function seed(db: Kysely<DB>): Promise<void> {
  await db.deleteFrom("posts").execute();
  await db.deleteFrom("users").execute();

  const numberOfUsers = 20;

  const users = [];
  for (let i = 0; i < numberOfUsers; i++) {
    const user = await db
      .insertInto("users")
      .values({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        displayName: faker.internet.displayName(),
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    users.push(user);
  }

  const posts = [];
  for (const user of users) {
    const numberOfPosts = 7;

    for (let i = 0; i < numberOfPosts; i++) {
      const post = await db
        .insertInto("posts")
        .values({
          userId: user.id,
          content: faker.lorem.sentences(2),
          createdAt: faker.date.recent({ days: 10 }).getTime(),
        })
        .returningAll()
        .executeTakeFirstOrThrow();

      posts.push(post);
    }
  }
}
