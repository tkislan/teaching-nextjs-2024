import { Kysely, sql } from "kysely";

export async function up(db: Kysely<unknown>): Promise<void> {
  await sql`CREATE TABLE posts (
		id integer primary key autoincrement not null,
		content text not null,
		created_at integer not null
	) STRICT`.execute(db);
}
