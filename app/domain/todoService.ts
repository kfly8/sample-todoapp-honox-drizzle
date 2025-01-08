import { err, ok } from "neverthrow";
import { createTodoId, todoSchema } from "./todo";
import type { Todo } from "./todo";

export type Params = Omit<Todo, "id">;

export function createTodo(params: Params) {
	const todo = {
		...params,
		// default values
		description: params.description ?? "",
		completed: params.completed ?? false,
		assigneeIds: params.assigneeIds ?? [],
		id: createTodoId(),
	};

	const parsed = todoSchema.safeParse(todo);
	if (parsed.error) {
		return err(parsed.error);
	}

	return ok(parsed.data);
}
