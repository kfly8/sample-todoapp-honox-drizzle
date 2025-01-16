import { zValidator as zv } from "@hono/zod-validator";
import { Hono } from "hono";

import { CreateTodoCmd } from "@/cmd/CreateTodoCmd";
import { todoSchema } from "@/domain/todo";
import { newCreateTodoRepository } from "@/infra";

const postRequest = todoSchema.pick({ title: true, authorId: true });

const app = new Hono();

// TODO: auth middleware
const routes = app.post("/", zv("json", postRequest), async (c) => {
	const { title, authorId } = c.req.valid("json");

	const repo = newCreateTodoRepository();
	const cmd = new CreateTodoCmd(repo);

	const cmdResult = await cmd.execute({ title, authorId });
	if (cmdResult.isErr()) {
		const error = cmdResult.error;
		return c.json({ message: error.message }, 500);
	}

	const todo = cmdResult.value;

	return c.json(todo, 201);
});

export type AppType = typeof routes;
export default app;
