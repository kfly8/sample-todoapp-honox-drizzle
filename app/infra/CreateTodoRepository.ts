import { eq } from "drizzle-orm";
import { ok } from "neverthrow";

import { todoAssignees, todos } from "./schema";
import type { DB, TX } from "./types";

import type { Repository, RepositoryParams } from "../cmd/CreateTodoCmd";

type Todo = RepositoryParams["todo"];

export class CreateTodoRepository implements Repository {
	#db: DB;

	constructor(db: DB) {
		this.#db = db;
	}

	async save({ todo }: RepositoryParams) {
		const { id, assigneeIds, ...rest } = todo;

		await this.#db.transaction(async (tx) => {
			await saveTodo(tx, { id, ...rest });
			await saveTodoAssignees(tx, id, assigneeIds);
		});

		return ok(null);
	}
}

async function saveTodo(
	tx: TX,
	data: Pick<Todo, "id" | "completed" | "title" | "description" | "authorId">,
) {
	const { completed, ...rest } = data;
	await tx.insert(todos).values({ ...rest, completed: !!completed });
}

async function saveTodoAssignees(
	tx: TX,
	todoId: Todo["id"],
	assigneeIds: Todo["assigneeIds"],
) {
	if (assigneeIds === undefined) {
		return;
	}

	const assignees = assigneeIds.map((userId) => ({ todoId, userId }));

	await tx.delete(todoAssignees).where(eq(todoAssignees.todoId, todoId));
	for (const assignee of assignees) {
		await tx.insert(todoAssignees).values(assignee);
	}
}
