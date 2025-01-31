import { err, ok } from "neverthrow";
import type { Result } from "neverthrow";
import type { Todo } from "../domain/todo";
import { updateTodo } from "../domain/todo";
import type { UpdateTodoParams } from "../domain/todo";
import type { Cmd } from "./cmd";

export type RepositoryParams = {
	todo: { id: Todo["id"] } & Partial<Omit<Todo, "id">>;
};

export interface Repository {
	save(params: RepositoryParams): Promise<Result<null, Error>>;
}

export class UpdateTodoCmd implements Cmd {
	constructor(private repo: Repository) {
		this.repo = repo;
	}

	async execute(params: UpdateTodoParams) {
		const result = updateTodo(params);
		if (result.isErr()) {
			return err(new Error("Failed to update todo", { cause: result.error }));
		}
		const todo = result.value;

		const saved = await this.repo.save({ todo });
		if (saved.isErr()) {
			return err(new Error("Failed to save todo", { cause: saved.error }));
		}

		return ok(todo);
	}
}
