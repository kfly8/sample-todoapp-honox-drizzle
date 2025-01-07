import { describe, expect, test } from "bun:test";
import { err, ok } from "neverthrow";
import type { Todo } from "../domain/model/todo";
import { createUserId } from "../domain/model/user";

import type { TodoRepository } from "../repository";
import { CreateTodoCmd } from "./CreateTodoCmd";

class TestTodoRepository implements TodoRepository {
	private storage: Todo[] = [];
	async save(todo: Todo) {
		this.storage.push(todo);
		return ok(null);
	}
	async getLatest() {
		return this.storage[this.storage.length - 1];
	}
}

describe("CreateTodoCmd", async () => {
	const repo = new TestTodoRepository();
	const cmd = new CreateTodoCmd(repo);

	test("When given valid todo params, then it should create a todo and save", async () => {
		const userId = createUserId();
		const todo = {
			title: "test",
			authorId: userId,
		};

		const expected = {
			id: expect.any(String),
			title: "test",
			description: "",
			authorId: userId,
			completed: false,
			assigneeIds: [],
		};

		const result = await cmd.execute(todo);

		expect(result).toEqual(ok(expected));
		expect(await repo.getLatest()).toEqual(expected);
	});

	test("When given invalid todo params, then it should return an error", async () => {
		const userId = createUserId();
		const todo = {
			title: "",
			authorId: userId,
		};

		const expected = new Error("Failed to create todo", {
			cause: expect.any(Error),
		});

		const result = await cmd.execute(todo);

		expect(result).toEqual(err(expected));
	});
});
