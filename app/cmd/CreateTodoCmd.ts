import { err, ok } from "neverthrow";
import type { Result } from "neverthrow";
import type { CreateTodoParams, Todo } from "../domain/todo";
import { createTodo } from "../domain/todo";

export type RepositoryParams = {
	todo: Todo;
};

export interface Repository {
	save(params: RepositoryParams): Promise<Result<null, Error>>;
}

export class CreateTodoCmd {
	constructor(private repo: Repository) {
		this.repo = repo;
	}

	async execute(params: CreateTodoParams) {
		const result = createTodo(params);
		if (result.isErr()) {
			return err(new Error("Failed to create todo", { cause: result.error }));
		}
		const todo = result.value;

		const saved = await this.repo.save({ todo });
		if (saved.isErr()) {
			return err(new Error("Failed to save todo", { cause: saved.error }));
		}

		return ok(todo);
	}
}
