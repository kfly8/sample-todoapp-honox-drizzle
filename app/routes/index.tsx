import { eq } from "drizzle-orm";
import { deleteCookie, getCookie } from "hono/cookie";
import { createRoute } from "honox/factory";

import { LoginContext } from "@/components/LoginContext";
import { TodoList } from "@/components/TodoList";
import type { User } from "@/domain/user";
import { createDrizzle } from "@/infra";
import { todos } from "@/infra/schema";
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

	const db = createDrizzle();
	const rows = await db.select().from(todos).where(eq(todos.authorId, user.id));

	return c.render(
		<LoginContext value={user}>
			<header>Hello, {user.name}</header>
			<TodoList todos={rows} />
		</LoginContext>,
		{ title: "Todo App" },
	);
});
