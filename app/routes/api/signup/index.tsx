import { zValidator as zv } from "@hono/zod-validator";
import { Hono } from "hono";

import { SignUpCmd } from "@/cmd/SignUpCmd";
import { userSchema } from "@/domain/user";
import { newSignUpRepository } from "@/infra";

const app = new Hono();

const signUpRepo = newSignUpRepository();
const signUpCmd = new SignUpCmd(signUpRepo);
const postRequest = userSchema.pick({ name: true });

export const post = app.post("/", zv("json", postRequest), async (c) => {
	const { name } = c.req.valid("json");

	const result = await signUpCmd.execute({ name });

	if (result.isErr()) {
		return c.json({ message: result.error.message }, 500);
	}

	return c.json(result.value, 201);
});

export type PostType = typeof post;

export default app;
