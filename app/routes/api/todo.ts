import { zValidator as zv } from "@hono/zod-validator";
import { Hono } from "hono";
import { getCookie } from "hono/cookie";

import { CreateTodoCmd } from "@/cmd/CreateTodoCmd";
import { todoSchema } from "@/domain/todo";
import type { User } from "@/domain/user";
import { newCreateTodoRepository } from "@/infra";
import { verifyToken } from "@/utils";

const app = new Hono();

const postRequest = todoSchema.pick({ title: true });

const POST = app.post("/", zv("json", postRequest), async (c) => {
	const token = getCookie(c, "token");
	if (token === undefined) {
		return c.text("Unauthorized", 401);
	}

	const verifyResult = await verifyToken<User>(token);
	if (verifyResult.isErr()) {
		return c.text("Unauthorized", 401);
	}

	const user = verifyResult.value;

	const { title } = c.req.valid("json");

	const repo = newCreateTodoRepository();
	const cmd = new CreateTodoCmd(repo);

	const cmdResult = await cmd.execute({ title, authorId: user.id });
	if (cmdResult.isErr()) {
		const error = cmdResult.error;
		return c.json({ message: error.message }, 500);
	}

	const todo = cmdResult.value;

	return c.json(todo, 201);
});

export type AppType = typeof POST;

export default app;
