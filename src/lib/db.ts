import { CamelCasePlugin, Kysely, SqliteDialect } from "kysely";
import SQLite from "better-sqlite3";
import { DB } from "./db-types";

export const dialect = new SqliteDialect({
  database: new SQLite("db.sqlite"),
});

export function createDB() {
  return new Kysely<DB>({
    dialect: dialect,
    plugins: [new CamelCasePlugin()],
  });
}
