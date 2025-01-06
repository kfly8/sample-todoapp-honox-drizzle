import { describe, expect, test } from "bun:test";
import { ok } from "neverthrow";
import type { ZodError } from "zod";
import type { Todo } from "../model";
import { createUserId } from "../model";
import { createTodo } from "./createTodo";

class TodoRepository implements TodoRepository {
	private storage: Todo[] = [];
	save(user: Todo) {
		this.storage.push(user);
		return ok(null);
	}
	getLatest() {
		return this.storage[this.storage.length - 1];
	}
}

describe("createTodo", async () => {
	const repo = new TodoRepository();
	const userId = createUserId();

	test("When valid todo is given, then ok", async () => {
		const expectedTodoId = expect.any(String);
		const cases = [
			{
				desc: "simple case",
				input: {
					title: "Buy milk",
					authorId: userId,
				},
				expected: {
					id: expectedTodoId,
					title: "Buy milk",
					description: "",
					authorId: userId,
					completed: false,
					assigneeIds: [],
				},
			},
			{
				desc: "with description, assignee, and completed",
				input: {
					title: "Buy milk",
					description: "Buy 2L milk",
					authorId: userId,
					assigneeIds: [userId],
					completed: true,
				},
				expected: {
					id: expectedTodoId,
					title: "Buy milk",
					description: "Buy 2L milk",
					authorId: userId,
					completed: true,
					assigneeIds: [userId],
				},
			},
		];

		for (const c of cases) {
			const result = createTodo(repo, c.input);
			expect(result).toEqual(ok(c.expected));
			expect(repo.getLatest()).toEqual(c.expected);
		}
	});

	test("When invalid todo, then returns ZodError", async () => {
		const cases = [
			{
				desc: "Too short title",
				input: {
					title: "",
					authorId: userId,
				},
				expected: { code: "too_small" },
			},
		];

		for (const c of cases) {
			const result = createTodo(repo, c.input);
			expect(result.isErr()).toBeTrue();

			if (result.isErr()) {
				const err = result.error as ZodError;
				expect(err.errors).toEqual([expect.objectContaining(c.expected)]);
			}
		}
	});
});
