import { eq } from "drizzle-orm";
import { err, ok } from "neverthrow";

import { todoAssignees, todos } from "./schema";
import type { DB, TX } from "./types";

import type { Repository, RepositoryParams } from "../cmd/UpdateTodoCmd";

type Todo = RepositoryParams["todo"];

export class UpdateTodoRepository implements Repository {
	#db: DB;

	constructor(db: DB) {
		this.#db = db;
	}

	async save({ todo }: RepositoryParams) {
		const { id, assigneeIds, ...rest } = todo;

		try {
			await this.#db.transaction(async (tx) => {
				await saveTodo(tx, { id, ...rest });
				await saveTodoAssignees(tx, id, assigneeIds);
			});
		} catch (error) {
			return err(new Error("Failed to save todo", { cause: error }));
		}

		return ok(null);
	}
}

async function saveTodo(
	tx: TX,
	data: Pick<Todo, "id" | "completed" | "title" | "description" | "authorId">,
) {
	const { id, completed, ...rest } = data;

	const set = {
		...rest,
		...(completed === undefined ? {} : { completed: !!completed }),
	};

	await tx.update(todos).set(set).where(eq(todos.id, id));
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

	// Overwrite all assignees
	await tx.delete(todoAssignees).where(eq(todoAssignees.todoId, todoId));
	for (const assignee of assignees) {
		await tx.insert(todoAssignees).values(assignee);
	}
}
