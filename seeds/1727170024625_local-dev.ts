import { faker } from "@faker-js/faker";
import type { Kysely } from "kysely";
import { DB } from "../src/lib/db-types";

export async function seed(db: Kysely<DB>): Promise<void> {
  await db.deleteFrom("messages").execute();
  await db.deleteFrom("comments").execute();
  await db.deleteFrom("posts").execute();
  await db.deleteFrom("users").execute();

  const numberOfUsers = 20;

  const users = [];

  const myUser = await db
    .insertInto("users")
    .values({
      id: 1,
      username: faker.internet.userName(),
      email: "admin@social.com",
      password: "abc123",
      displayName: faker.internet.displayName(),
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  users.push(myUser);

  for (let i = 0; i < numberOfUsers; i++) {
    const user = await db
      .insertInto("users")
      .values({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        displayName: faker.internet.displayName(),
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    users.push(user);
  }

  const posts = [];
  for (const user of users) {
    const numberOfPosts = faker.number.int({ min: 0, max: 20 });

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

  for (const post of posts) {
    for (const user of users) {
      const shouldCreateComment = faker.datatype.boolean(0.1);

      if (shouldCreateComment) {
        await db
          .insertInto("comments")
          .values({
            userId: user.id,
            postId: post.id,
            content: faker.lorem.sentences(2),
            createdAt: faker.date
              .between({ from: new Date(post.createdAt), to: new Date() })
              .getTime(),
          })
          .execute();
      }
    }
  }

  for (const fromUser of users) {
    for (const toUser of users) {
      if (fromUser.id === toUser.id) {
        continue;
      }

      // const shouldCreateMessages = faker.datatype.boolean(0.2);

      // if (!shouldCreateMessages) {
      //   continue;
      // }

      const numberOfMessages = faker.number.int({ min: 1, max: 10 });

      for (let i = 0; i < numberOfMessages; i += 1) {
        const numberOfSenteces = faker.number.int({ min: 1, max: 3 });

        await db
          .insertInto("messages")
          .values({
            fromUserId: fromUser.id,
            toUserId: toUser.id,
            message: faker.lorem.sentences(numberOfSenteces),
            createdAt: faker.date.recent({ days: 10 }).getTime(),
          })
          .execute();
      }
    }
  }
}
