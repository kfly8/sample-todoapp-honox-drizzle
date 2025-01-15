import { zValidator as zv } from "@hono/zod-validator";
import { Hono } from "hono";

import { CreateTodoCmd } from "@/cmd/CreateTodoCmd";
import { todoSchema } from "@/domain/todo";
import { newCreateTodoRepository } from "@/infra";

const app = new Hono();

const postRequest = todoSchema.pick({ title: true, authorId: true });

// TODO: auth middleware
const POST = app.post("/", zv("json", postRequest), async (c) => {
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

// TODO: Grouping all api routes
export type AppType = typeof POST;

export default app;
