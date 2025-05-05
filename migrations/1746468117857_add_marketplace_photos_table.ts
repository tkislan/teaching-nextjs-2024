import { sql, type Kysely } from "kysely";

export async function up(db: Kysely<unknown>): Promise<void> {
  await sql`CREATE TABLE marketplace_photos (
		id integer primary key autoincrement not null,
		marketplace_id integer not null,
		photo_url text not null,
		created_at integer not null,
		foreign key (marketplace_id) references marketplace (id)
	) STRICT`.execute(db);
}
