import { describe, expect, test } from "bun:test";
import { eq } from "drizzle-orm";
import { ok } from "neverthrow";

import { buildFakeTodo, createDrizzle, createFakeUser } from "../test/util";
import { todoAssignees, todos } from "./schema";

import { CreateTodoRepository } from "./CreateTodoRepository";

describe("save", async () => {
	const db = createDrizzle();
	const repo = new CreateTodoRepository(db);

	test("When given valid todo params, then it should create a todo and save", async () => {
		const user = await createFakeUser();
		const todo = buildFakeTodo({ authorId: user.id });

		const result = await repo.save({ todo });
		expect(result).toEqual(ok(null));

		const todoRow = await db
			.select()
			.from(todos)
			.where(eq(todos.id, todo.id))
			.get();

		expect(todoRow).toEqual({
			id: todo.id,
			title: todo.title,
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
