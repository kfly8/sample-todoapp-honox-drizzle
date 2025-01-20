import { Glob } from "bun";
import { Hono } from "hono";
import type { H } from "hono/types";
import { filePathToPath } from "honox/utils/file";

// Copy from 'honox/src/server/server.ts'
const METHODS = ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"] as const;

const glob = new Glob("**/*.{ts,tsx}");

const app = new Hono().basePath("/api");

// Create AppType for RPC.
// This is not a routing table for the real server, just a type definition

for await (const file of glob.scan("./app/routes/api/")) {
	if (file.match(/test.(ts|tsx)$/)) continue;

	const module = await import(`./${file}`);

	const path = filePathToPath(file);

	for (const [method, handlers] of Object.entries(module)) {
		for (const m of METHODS) {
			if (method === m) {
				app.on(m, path, ...(handlers as H[]));
			}
		}
	}
}

export { app };
export type AppType = typeof app;
