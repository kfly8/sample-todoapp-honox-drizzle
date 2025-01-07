import { eq } from "drizzle-orm";
import type { LibSQLDatabase } from "drizzle-orm/libsql";
import { ok } from "neverthrow";

import type { Todo } from "../../domain/model/todo";
import type { TodoRepository } from "../../repository";
import { todoAssignees, todos } from "./schema";

export class TodoRepositoryImpl implements TodoRepository {
	#db: LibSQLDatabase;

	constructor(db: LibSQLDatabase) {
		this.#db = db;
	}

	async save(params: Todo) {
		const { id, assigneeIds, ...todo } = params;

		await this.#db
			.insert(todos)
			.values({ id, ...todo })
			.onConflictDoUpdate({
				target: todos.id,
				set: todo,
			});

		// Assignees
		// TODO: Implement assignees
		// if (assigneeIds !== undefined) {
		// 	const assignees = assigneeIds.map(assigneeId => ({ todoId: id, assigneeId }));

		// 	this.#db.delete(todoAssignees).where(eq(todoAssignees.todoId, id));
		// 	for (const assignee of assignees) {
		// 		await this.#db.insert(todoAssignees).values(assignee);
		// 	}
		// }

		return ok(null);
	}
}
