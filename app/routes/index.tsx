import { css } from "hono/css";
import { createRoute } from "honox/factory";
import Signup from "../islands/signup";

const className = css`
  font-family: sans-serif;
`;

export default createRoute((c) => {
	return c.render(
		<div class={className}>
			<Signup />
		</div>,
		{ title: "Todo App" },
	);
});
