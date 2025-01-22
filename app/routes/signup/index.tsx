import { zValidator as zv } from "@hono/zod-validator";
import { setCookie } from "hono/cookie";
import { createRoute } from "honox/factory";

import { SignUpCmd } from "@/cmd/SignUpCmd";
import { userSchema } from "@/domain/user";
import { newSignUpRepository } from "@/infra";
import { generateToken } from "@/token";

import Layout from "@/components/Layout";

export const GET = createRoute(async (c) => {
	return c.render(
		<Layout>
			<form action="/signup" method="post">
				<input
					type="text"
					name="name"
					placeholder="Input your name"
					required
					class="flex-grow border border-gray-100 rounded-l-md px-3 py-2 focus:outline-none focus:ring focus:ring-gray-100"
				/>
				<input
					type="submit"
					value="SignUp"
					class="bg-gray-100 text-gray-600 px-4 py-2 rounded-r-md hover:bg-gray-200 transition"
				/>
			</form>
		</Layout>,
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

	const user = result.value;

	const token = await generateToken({ user });
	setCookie(c, "token", token, { httpOnly: true });

	return c.redirect("/");
});
