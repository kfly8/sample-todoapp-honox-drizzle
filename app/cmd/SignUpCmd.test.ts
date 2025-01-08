import { describe, expect, test } from "bun:test";
import { err, ok } from "neverthrow";

import type { Repository, RepositoryParams } from "./SignUpCmd";
import { SignUpCmd } from "./SignUpCmd";

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

describe("SignUpCmd.execute", async () => {
	const repo = new TestRepository();
	const cmd = new SignUpCmd(repo);

	test("When given valid params, then it should create a user and save", async () => {
		const user = {
			name: "test",
		};

		const expected = {
			id: expect.any(String),
			name: "test",
		};

		const result = await cmd.execute(user);

		expect(result).toEqual(ok(expected));
		expect(await repo.getLatest()).toEqual({ user: expected });
	});

	test("When given invalid params, then it should return an error", async () => {
		const user = {
			name: "",
		};

		const expected = new Error("Failed to signUp", {
			cause: expect.any(Error),
		});

		const result = await cmd.execute(user);

		expect(result).toEqual(err(expected));
	});
});
