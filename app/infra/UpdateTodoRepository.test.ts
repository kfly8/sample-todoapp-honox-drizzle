import { describe, expect, test } from "bun:test";
import { eq } from "drizzle-orm";
import { ok } from "neverthrow";

import { createDrizzle } from "../infra";
import { createFakeTodo, createFakeUser } from "../test/util";
import { todoAssignees, todos } from "./schema";

import { UpdateTodoRepository } from "./UpdateTodoRepository";

describe("save", async () => {
	const db = createDrizzle();
	const repo = new UpdateTodoRepository(db);

	test("When valid todo params is given, then it should create a todo and save", async () => {
		const user = await createFakeUser();
		const todo = await createFakeTodo({ authorId: user.id });

		const title = "test";

		const result = await repo.save({ todo: { id: todo.id, title } });
		expect(result).toEqual(ok(null));

		const todoRow = db.select().from(todos).where(eq(todos.id, todo.id)).get();

		expect(todoRow).toEqual({
			id: todo.id,
			title: "test",
			description: todo.description,
			completed: todo.completed,
			authorId: todo.authorId,
			createdAt: expect.any(String),
			updatedAt: expect.any(String),
		});

		const assigneeRows = await db
			.select()
			.from(todoAssignees)
			.where(eq(todoAssignees.todoId, todo.id));
		expect(assigneeRows).toEqual([]);
	});
});
