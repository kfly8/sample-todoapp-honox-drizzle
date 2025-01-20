import { Hono } from "hono";
import type { H } from "hono/types";
import { filePathToPath } from "honox/utils/file";

// Copy from 'honox/src/server/server.ts'
const METHODS = ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"] as const;

// Create AppType for RPC.
// This is not a routing table for the real server, just a type definition

const app = new Hono();

const modules = {
	"/api/todo.ts": import("./todo"),
	"/api/todo/[id].ts": import("./todo/[id]"),
};

for (const [file, module] of Object.entries(modules)) {
	const loaded = await module;
	const path = filePathToPath(file);

	for (const [method, handlers] of Object.entries(
		loaded as Record<string, H[]>,
	)) {
		for (const m of METHODS) {
			if (method === m) {
				app.on(m, path, ...handlers);
			}
		}
	}
}

export { app };
export type AppType = typeof app;
