import { deleteCookie, getCookie } from "hono/cookie";
import { createRoute } from "honox/factory";

import { LoginContext } from "@/components/LoginContext";
import { TodoList } from "@/components/TodoList";
import type { User } from "@/domain/user";
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

	return c.render(
		<LoginContext value={user}>
			<header>Hello, {user.name}</header>
			<TodoList />
		</LoginContext>,
		{ title: "Todo App" },
	);
});
