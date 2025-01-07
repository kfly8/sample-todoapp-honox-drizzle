import { err, ok } from "neverthrow";
import { createTodo } from "../domain/service/todo";
import type { Params } from "../domain/service/todo";
import type { TodoRepository } from "../repository";

export class CreateTodoCmd {
	constructor(private repo: TodoRepository) {
		this.repo = repo;
	}

	async execute(params: Params) {
		const result = createTodo(params);
		if (result.isErr()) {
			return err(new Error("Failed to create todo", { cause: result.error }));
		}
		const todo = result.value;

		const saved = await this.repo.save(todo);
		if (saved.isErr()) {
			return err(new Error("Failed to save todo", { cause: saved.error }));
		}

		return ok(todo);
	}
}
