import { eq } from "drizzle-orm";
import type { BunSQLiteDatabase } from "drizzle-orm/bun-sqlite";
import { ok } from "neverthrow";

import { todoAssignees, todos } from "./schema";

import type { Repository, RepositoryParams } from "../cmd/CreateTodoCmd";

type Todo = RepositoryParams["todo"];

export class CreateTodoRepository implements Repository {
	#db: BunSQLiteDatabase;

	constructor(db: BunSQLiteDatabase) {
		this.#db = db;
	}

	async save({ todo }: RepositoryParams) {
		const { id, assigneeIds, completed, ...rest } = todo;

		// TODO: txn
		await this.#db
			.insert(todos)
			.values({ id, completed: !!completed, ...rest });
		await this.saveTodoAssignees(id, assigneeIds);

		return ok(null);
	}

	private async saveTodoAssignees(
		todoId: Todo["id"],
		assigneeIds: Todo["assigneeIds"],
	) {
		if (assigneeIds === undefined) {
			return;
		}

		const assignees = assigneeIds.map((userId) => ({ todoId, userId }));

		await this.#db
			.delete(todoAssignees)
			.where(eq(todoAssignees.todoId, todoId));
		for (const assignee of assignees) {
			await this.#db.insert(todoAssignees).values(assignee);
		}
	}
}
