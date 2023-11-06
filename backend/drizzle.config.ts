import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/photodrop-database-schema/schema/*",
  out: "./migrations-folder",
  driver: "mysql2",
} satisfies Config;
