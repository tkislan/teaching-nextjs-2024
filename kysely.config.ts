import { defineConfig } from "kysely-ctl";
import { dialect } from "./src/lib/db";

export default defineConfig({
  dialect: dialect,
});
