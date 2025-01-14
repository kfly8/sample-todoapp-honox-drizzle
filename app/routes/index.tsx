import { deleteCookie, getCookie } from "hono/cookie";
import { createContext } from "hono/jsx";
import { createRoute } from "honox/factory";

import type { User } from "@/domain/user";
import { verifyToken } from "@/utils";

const LoginContext = createContext<User | null>(null);

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
		</LoginContext>,
		{ title: "Todo App" },
	);
});
