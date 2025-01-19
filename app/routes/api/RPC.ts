import { Hono } from "hono";

// TODO: refactor
import { POST as todo_POST } from "./todo";
import { PATCH as todo_id_PATCH } from "./todo/[id]";

// Create AppType for RPC.
// This is not a routing table for the real server, just a type definition

export const app = new Hono()
	.basePath("/api")
	.post("/todo", ...todo_POST)
	.patch("/todo/:id", ...todo_id_PATCH);

export type AppType = typeof app;
