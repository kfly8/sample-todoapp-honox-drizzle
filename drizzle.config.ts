import type { Config } from "drizzle-kit";

export default {
	schema: "app/infra/db/schema.ts",
	out: "app/infra/db/migrations",
	dialect: "sqlite",
	dbCredentials: {
		// biome-ignore lint/style/noNonNullAssertion: ignore
		url: process.env.DATABASE_URL!,
	},
} satisfies Config;
