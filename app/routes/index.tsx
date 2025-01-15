import { desc, eq } from "drizzle-orm";
import { deleteCookie, getCookie } from "hono/cookie";
import { createRoute } from "honox/factory";

import { LoginContext } from "@/components/LoginContext";
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

	const user = result.value;

	// TODO: Move to query or call /api/todo
	const db = createDrizzle();
	const rows = await db
		.select()
		.from(todos)
		.where(eq(todos.authorId, user.id))
		.orderBy(desc(todos.createdAt));

	return c.render(
		<LoginContext value={user}>
			<header>Hello, {user.name}</header>
			<TodoIsland user={user} todos={rows} />
		</LoginContext>,
		{ title: "Todo App" },
	);
});
