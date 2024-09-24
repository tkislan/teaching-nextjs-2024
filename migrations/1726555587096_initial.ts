import { Kysely, sql } from "kysely";

export async function up(db: Kysely<unknown>): Promise<void> {
  await sql`CREATE TABLE users (
		id integer primary key autoincrement not null,
		username text not null unique,
		email text not null unique,
		display_name text
	) STRICT`.execute(db);

  await sql`CREATE TABLE posts (
		id integer primary key autoincrement not null,
		user_id integer not null,
		content text not null,
		created_at integer not null,
		foreign key (user_id) references users (id)
	) STRICT`.execute(db);

  await sql`CREATE TABLE comments (
		id integer primary key autoincrement not null,
		user_id integer not null,
		post_id integer not null,
		content text not null,
		created_at integer not null,
		foreign key (user_id) references users (id),
		foreign key (post_id) references posts (id)
	) STRICT`.execute(db);
}
