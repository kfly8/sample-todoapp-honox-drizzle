import { Hono } from "hono";

import { POST } from "./todo";

// Create AppType for RPC.
// This is not a routing table for the real server, just a type definition

export const app = new Hono().basePath("/api").post("/todo", ...POST);

export type AppType = typeof app;
