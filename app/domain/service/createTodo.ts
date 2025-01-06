import { err, ok } from "neverthrow";
import { createTodoId, todoSchema } from "../model";
import type { Todo } from "../model";
import type { TodoRepository } from "../repository";

type Params = Omit<Todo, "id">;

export function createTodo(repo: TodoRepository, data: Params) {
	const todo = {
		...data,
		// default values
		description: data.description ?? "",
		completed: data.completed ?? false,
		assigneeIds: data.assigneeIds ?? [],
		id: createTodoId(),
	};

	const parsed = todoSchema.safeParse(todo);
	if (parsed.error) {
		return err(parsed.error);
	}

	const saved = repo.save(parsed.data);
	if (saved.isErr()) {
		return err(saved.error);
	}

	return ok(parsed.data);
}
