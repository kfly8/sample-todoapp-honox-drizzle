import { describe, expect, test } from "bun:test";
import { err, ok } from "neverthrow";
import { createTodoId } from "../domain/todo";

import type { Repository, RepositoryParams } from "./UpdateTodoCmd";
import { UpdateTodoCmd } from "./UpdateTodoCmd";

class TestRepository implements Repository {
	private storage: RepositoryParams[] = [];
	async save(params: RepositoryParams) {
		this.storage.push(params);
		return ok(null);
	}
	async getLatest() {
		return this.storage[this.storage.length - 1];
	}
}

describe("UpdateTodoCmd.execute", async () => {
	const repo = new TestRepository();
	const cmd = new UpdateTodoCmd(repo);

	test("When given valid todo params, then it should create a todo and save", async () => {
		const id = createTodoId();
		const title = "test";

		const params = { id, title };

		const expected = {
			id,
			title: "test",
		};

		const result = await cmd.execute(params);

		expect(result).toEqual(ok(expected));
		expect(await repo.getLatest()).toEqual({ todo: expected });
	});

	test("When given invalid todo params, then it should return an error", async () => {
		const id = createTodoId();
		const title = "";

		const params = { id, title };

		const expected = new Error("Failed to update todo", {
			cause: expect.any(Error),
		});

		const result = await cmd.execute(params);

		expect(result).toEqual(err(expected));
	});
});
