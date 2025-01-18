import { zValidator as zv } from "@hono/zod-validator";
import { Hono } from "hono";
import { createRoute } from "honox/factory";

import { CreateTodoCmd } from "@/cmd/CreateTodoCmd";
import { todoSchema } from "@/domain/todo";
import { newCreateTodoRepository } from "@/infra";

const postRequest = todoSchema.pick({ title: true, authorId: true });

export const POST = createRoute(zv("json", postRequest), async (c) => {
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

// TODO: refactor
const app = new Hono();
const routes = app.post("/todo", ...POST);
export type AppType = typeof routes;
