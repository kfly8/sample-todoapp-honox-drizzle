import { eq } from "drizzle-orm";
import type { LibSQLDatabase } from "drizzle-orm/libsql";
import { ok } from "neverthrow";

import type { Todo } from "../domain/model/todo";
import { todoAssignees, todos } from "./schema";

import type { Repository } from "../cmd/CreateTodoCmd";

export class CreateTodoRepository implements Repository {
	#db: LibSQLDatabase;

	constructor(db: LibSQLDatabase) {
		this.#db = db;
	}

	async save(params: Todo) {
		const { id, assigneeIds, ...todo } = params;

		// TODO: txn
		await this.#db.insert(todos).values({ id, ...todo });
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
