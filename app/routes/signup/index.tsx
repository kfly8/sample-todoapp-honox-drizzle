import { zValidator as zv } from "@hono/zod-validator";
import { setCookie } from "hono/cookie";
import { createRoute } from "honox/factory";

import { SignUpCmd } from "@/cmd/SignUpCmd";
import { userSchema } from "@/domain/user";
import { newSignUpRepository } from "@/infra";
import { generateUserToken } from "@/utils";

export const GET = createRoute(async (c) => {
	return c.render(
		<form action="/signup" method="post">
			<input type="text" name="name" placeholder="Input your name" required />
			<input type="submit" value="SignUp" />
		</form>,
	);
});

const postRequest = userSchema.pick({ name: true });

export const POST = createRoute(zv("form", postRequest), async (c) => {
	const { name } = c.req.valid("form");

	const signUpRepo = newSignUpRepository();
	const signUpCmd = new SignUpCmd(signUpRepo);

	const result = await signUpCmd.execute({ name });

	if (result.isErr()) {
		return c.json({ message: result.error.message }, 500);
	}

	const payload = { user: result.value };
	const token = await generateUserToken(payload);
	setCookie(c, "token", token, { httpOnly: true });

	return c.redirect("/");
});
