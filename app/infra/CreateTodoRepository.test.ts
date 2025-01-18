import { describe, expect, test } from "bun:test";
import { eq } from "drizzle-orm";
import { err, ok } from "neverthrow";

import type { User } from "@/domain/user";
import { createDrizzle } from "../infra";
import { buildFakeTodo, createFakeUser } from "../test/util";
import { todoAssignees, todos } from "./schema";

import { CreateTodoRepository } from "./CreateTodoRepository";

describe("save", async () => {
	const db = createDrizzle();
	const repo = new CreateTodoRepository(db);

	test("When valid todo params is given, then it should create a todo and save", async () => {
		const user = await createFakeUser();
		const todo = buildFakeTodo({ authorId: user.id });

		const result = await repo.save({ todo });
		expect(result).toEqual(ok(null));

		const todoRow = db.select().from(todos).where(eq(todos.id, todo.id)).get();

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

	test("When invalid todo params is given, then it should return an error", async () => {
		const todo = buildFakeTodo({ authorId: "unknown author" as User["id"] });

		const result = await repo.save({ todo });
		const expected = new Error("Failed to save todo", {
			cause: expect.any(Error),
		});
		expect(result).toEqual(err(expected));
	});
});
