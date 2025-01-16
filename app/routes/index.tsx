import { desc, eq } from "drizzle-orm";
import { deleteCookie, getCookie } from "hono/cookie";
import { createRoute } from "honox/factory";

import type { User } from "@/domain/user";
import { createDrizzle } from "@/infra";
import { todos } from "@/infra/schema";

import TodoIsland from "@/islands/TodoIsland";
import { verifyToken } from "@/utils";

export default createRoute(async (c) => {
	const token = getCookie(c, "token");

	if (token === undefined) {
		return c.redirect("/signup");
	}

	const result = await verifyToken<User>(token);
	if (result.isErr()) {
		deleteCookie(c, "token");
		return c.text("Unauthorized", 401);
	}

	const user = { id: result.value.id, name: result.value.name };

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
