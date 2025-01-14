import { verifyUserToken } from "@/utils";
import { deleteCookie, getCookie } from "hono/cookie";
import { css } from "hono/css";
import { createRoute } from "honox/factory";

const className = css`
  font-family: sans-serif;
`;

export default createRoute(async (c) => {
	const token = getCookie(c, "token");

	if (token === undefined) {
		return c.redirect("/signup");
	}

	const result = await verifyUserToken(token);
	if (result.isErr()) {
		deleteCookie(c, "token");
		return c.text("Unauthorized", 401);
	}

	const user = result.value.user;

	return c.render(<div class={className}>Hello, {user.name}</div>, {
		title: "Todo App",
	});
});
