import { describe, expect, test } from "bun:test";
import { eq } from "drizzle-orm";
import { ok } from "neverthrow";

import { createDrizzle, createFakeTodo } from "../../test/util";
import { todos } from "./schema";

import { TodoRepositoryImpl } from "./TodoRepository";

describe("save", async () => {
	const db = createDrizzle();
	const repo = new TodoRepositoryImpl(db);

	test("When given valid todo params, then it should create a todo and save", async () => {
		const todo = createFakeTodo();

		const result = await repo.save(todo);
		expect(result).toEqual(ok(null));

		const got = await db
			.select()
			.from(todos)
			.where(eq(todos.id, todo.id))
			.get();
		expect(got).toEqual(
			expect.objectContaining({
				...todo,
				createdAt: expect.any(String),
				updatedAt: expect.any(String),
			}),
		);

		const result2 = await repo.save({ ...todo, title: "new name" });
		expect(result2).toEqual(ok(null));

		const got2 = await db
			.select()
			.from(todos)
			.where(eq(todos.id, todo.id))
			.get();
		expect(got2).toEqual(
			expect.objectContaining({
				...todo,
				name: "new name",
			}),
		);
	});
});
