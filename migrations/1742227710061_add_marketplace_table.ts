import { sql, type Kysely } from "kysely";

export async function up(db: Kysely<unknown>): Promise<void> {
  await sql`CREATE TABLE marketplace (
			id integer primary key autoincrement not null,
			user_id integer not null,
			name text not null,
			description text not null,
			category text not null,
			price integer not null,
			created_at integer not null,
			foreign key (user_id) references users (id)
		) STRICT`.execute(db);
}
