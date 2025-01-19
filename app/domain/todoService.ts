import { err, ok } from "neverthrow";
import { createTodoId, todoSchema } from "./todo";
import type { Todo } from "./todo";

export type CreateTodoParams = Omit<Todo, "id">;

export function createTodo(params: CreateTodoParams) {
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

export type UpdateTodoParams = Partial<CreateTodoParams>;

const partialTodoSchema = todoSchema.partial();

export function updateTodo(id: Todo["id"], params: UpdateTodoParams) {
	const parsed = partialTodoSchema.safeParse(params);
	if (parsed.error) {
		return err(parsed.error);
	}

	const todo = {
		id,
		...parsed.data,
	};

	return ok(todo);
}
