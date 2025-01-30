import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { etag } from "hono/etag";

const app = new Hono();
app.use("/*", etag(), serveStatic({ root: "./" }));

export default app;
