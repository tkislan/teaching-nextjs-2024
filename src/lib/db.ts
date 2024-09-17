import { SqliteDialect } from "kysely";
import SQLite from "better-sqlite3";

export const dialect = new SqliteDialect({
  database: new SQLite("db.sqlite"),
});
