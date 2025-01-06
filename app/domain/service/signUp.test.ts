import { describe, expect, test } from "bun:test";
import { ok } from "neverthrow";
import type { ZodError } from "zod";
import type { User } from "../model";
import { signUp } from "./signUp";

class UserRepository implements UserRepository {
	private storage: User[] = [];
	save(user: User) {
		this.storage.push(user);
		return ok(null);
	}
	getLatest() {
		return this.storage[this.storage.length - 1];
	}
}

describe("signUp", async () => {
	const repo = new UserRepository();

	test("When valid name is given, then ok", async () => {
		const name = "kobaken";
		const result = signUp(repo, name);

		const expected = {
			id: expect.any(String),
			name,
		};

		expect(result).toEqual(ok(expected));
		expect(repo.getLatest()).toEqual(expected);
	});

	test("When invalid user, then returns ZodError", async () => {
		const cases = [
			{
				desc: "Too short name",
				input: "",
				expected: { code: "too_small" },
			},
			{
				desc: "Too long name",
				input: "a".repeat(101),
				expected: { code: "too_big" },
			},
		];

		for (const c of cases) {
			const result = signUp(repo, c.input);
			expect(result.isErr()).toBeTrue();

			if (result.isErr()) {
				const err = result.error as ZodError;
				expect(err.errors).toEqual([expect.objectContaining(c.expected)]);
			}
		}
	});
});
