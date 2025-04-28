import { sql, type Kysely } from "kysely";

export async function up(db: Kysely<unknown>): Promise<void> {
  await sql`ALTER TABLE posts ADD COLUMN photo_url TEXT`.execute(db);
}
