import { desc, eq } from "drizzle-orm";
import { Hono } from "hono";
import { deleteCookie, getCookie } from "hono/cookie";
import { jwt } from "hono/jwt";
import type { JwtVariables } from "hono/jwt";
import { logger } from "hono/logger";
import { createRoute } from "honox/factory";

import { createDrizzle } from "@/infra";
import { todos } from "@/infra/schema";
import { TOKEN_SECRET, verifyToken } from "@/token";

import TodoIsland from "@/islands/TodoIsland";

type Variables = JwtVariables;

const app = new Hono<{ Variables: Variables }>();

app.use(logger());

app.use("/api/*", jwt({ secret: TOKEN_SECRET, cookie: "token" }));

export const GET = createRoute(async (c) => {
	const token = getCookie(c, "token");

	if (token === undefined) {
		return c.redirect("/signup");
	}

	const result = await verifyToken(token);
	if (result.isErr()) {
		deleteCookie(c, "token");
		return c.text("Unauthorized", 401);
	}

	const user = result.value.user;

	// Move to query namespace if it gets too complicated
	const db = createDrizzle();
	const rows = await db
		.select({
			id: todos.id,
			title: todos.title,
			completed: todos.completed,
			authorId: todos.authorId,
		})
		.from(todos)
		.where(eq(todos.authorId, user.id))
		.orderBy(desc(todos.createdAt));

	return c.render(
		<>
			<header>Hello, {user.name}</header>
			<TodoIsland user={user} todos={rows} />
		</>,
		{ title: "Todo App" },
	);
});

export default app;
