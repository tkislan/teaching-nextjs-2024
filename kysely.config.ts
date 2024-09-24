import { defineConfig } from "kysely-ctl";
import { dialect } from "./src/lib/db";
import { CamelCasePlugin } from "kysely";

export default defineConfig({
  dialect: dialect,
  plugins: [new CamelCasePlugin()],
});
