import { Hono } from "hono";

// Create AppType for RPC.
// This is not a routing table for the real server, just a type definition

const app = new Hono().basePath("/api");

import { POST } from "./todo";
const routes = app.post("/todo", ...POST);

export type AppType = typeof routes;
