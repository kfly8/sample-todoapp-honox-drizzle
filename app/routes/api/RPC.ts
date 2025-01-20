import { Hono } from "hono";

import * as todo from "./todo";
import * as todo_id from "./todo/[id]";

// Create AppType for RPC.
// This is not a routing table for the real server, just a type definition

export const app = new Hono()
	.basePath("/api")
	.on("POST", "/todo", ...todo.POST)
	.on("PATCH", "/todo/:id", ...todo_id.PATCH);

export type AppType = typeof app;
