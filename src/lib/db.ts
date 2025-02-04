import SQLite from "better-sqlite3";
import { CamelCasePlugin, Kysely, SqliteDialect } from "kysely";
import { DB } from "./db-types";

export const dialect = new SqliteDialect({
  database: new SQLite("db.sqlite"),
});

export function createDB() {
  return new Kysely<DB>({
    dialect: dialect,
    plugins: [new CamelCasePlugin()],
    log: ["query"],
  });
}
