import type { Config } from "drizzle-kit";

export default {
	schema: "app/infra/schema.ts",
	out: "app/infra/migrations",
	dialect: "sqlite",
	dbCredentials: {
		// biome-ignore lint/style/noNonNullAssertion: ignore
		url: `file:${process.env.VITE_DATABASE_PATH!}`,
	},
} satisfies Config;
