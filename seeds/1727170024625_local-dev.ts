import { faker } from "@faker-js/faker";
import type { Kysely } from "kysely";
import { MARKETPLACE_CATEGORIES } from "../src/lib/db-constants";
import { DB } from "../src/lib/db-types";

export async function seed(db: Kysely<DB>): Promise<void> {
  await db.deleteFrom("messages").execute();
  await db.deleteFrom("comments").execute();
  await db.deleteFrom("posts").execute();
  await db.deleteFrom("marketplace").execute();
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
      const hasPhoto = faker.datatype.boolean(0.5);

      const post = await db
        .insertInto("posts")
        .values({
          userId: user.id,
          content: faker.lorem.sentences(2),
          photoUrl: hasPhoto ? faker.image.url() : null,
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

  const messageUsersPairs = [];
  for (let i = 0; i < users.length; i += 1) {
    for (let j = i + 1; j < users.length; j += 1) {
      const shouldCreateMessages = faker.datatype.boolean(0.2);

      if (shouldCreateMessages === true) {
        messageUsersPairs.push([users[i].id, users[j].id]);
      }
    }
  }

  for (const pair of messageUsersPairs) {
    const numberOfMessages01 = faker.number.int({ min: 0, max: 10 });
    const numberOfMessages10 = faker.number.int({ min: 0, max: 10 });

    for (let i = 0; i < numberOfMessages01; i += 1) {
      const numberOfSenteces = faker.number.int({ min: 1, max: 3 });

      await db
        .insertInto("messages")
        .values({
          fromUserId: pair[0],
          toUserId: pair[1],
          message: faker.lorem.sentences(numberOfSenteces),
          createdAt: faker.date.recent({ days: 10 }).getTime(),
        })
        .execute();
    }

    for (let i = 0; i < numberOfMessages10; i += 1) {
      const numberOfSenteces = faker.number.int({ min: 1, max: 3 });

      await db
        .insertInto("messages")
        .values({
          fromUserId: pair[1],
          toUserId: pair[0],
          message: faker.lorem.sentences(numberOfSenteces),
          createdAt: faker.date.recent({ days: 10 }).getTime(),
        })
        .execute();
    }
  }

  for (const user of users) {
    const numberOfMarketplaceItems = faker.number.int({ min: 0, max: 2 });

    for (let i = 0; i < numberOfMarketplaceItems; i += 1) {
      await db
        .insertInto("marketplace")
        .values({
          userId: user.id,
          name: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          category: faker.helpers.arrayElement(
            Object.keys(MARKETPLACE_CATEGORIES)
          ),
          price: faker.number.int({ min: 1, max: 1000 }),
          createdAt: faker.date.recent({ days: 10 }).getTime(),
        })
        .execute();
    }
  }
}
