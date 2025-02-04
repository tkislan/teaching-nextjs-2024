import { sql, type Kysely } from "kysely";

export async function up(db: Kysely<unknown>): Promise<void> {
  await sql`CREATE TABLE messages (
			id integer primary key autoincrement not null,
			from_user_id integer not null,
			to_user_id integer not null,
			message text not null,
			created_at integer not null,
			foreign key (from_user_id) references users (id),
		foreign key (to_user_id) references users (id)
		) STRICT`.execute(db);
}
