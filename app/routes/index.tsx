import { AuthProvider } from "@/hooks/auth";
import Signup from "@/islands/signup";
import { css } from "hono/css";
import { createRoute } from "honox/factory";

const className = css`
  font-family: sans-serif;
`;

export default createRoute((c) => {
	return c.render(
		<AuthProvider class={className}>
			<Signup />
		</AuthProvider>,
		{ title: "Todo App" },
	);
});
