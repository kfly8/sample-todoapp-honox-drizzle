import { zValidator as zv } from "@hono/zod-validator";
import { createRoute } from "honox/factory";

import { UpdateTodoCmd } from "@/cmd/UpdateTodoCmd";
import { todoSchema } from "@/domain/todo";
import { newUpdateTodoRepository } from "@/infra";

const putParam = todoSchema.pick({ id: true });
const putRequest = todoSchema.omit({ id: true }).partial();

export const PATCH = createRoute(
	zv("param", putParam),
	zv("json", putRequest),
	async (c) => {
		const id = c.req.valid("param").id;

		const repo = newUpdateTodoRepository();
		const cmd = new UpdateTodoCmd(repo);

		const data = { id, ...c.req.valid("json") };

		const cmdResult = await cmd.execute(data);
		if (cmdResult.isErr()) {
			const error = cmdResult.error;
			return c.json({ message: error.message }, 500);
		}

		const todo = cmdResult.value;

		return c.json(todo, 200);
	},
);
