import { describe, expect, test } from "bun:test";
import { ok } from "neverthrow";
import type { ZodError } from "zod";
import { signUp } from "./signUp";

describe("signUp", async () => {
	test("When valid user is given, then ok", async () => {
		const name = "kobaken";
		const result = signUp({ name });

		const expected = {
			id: expect.any(String),
			name,
		};

		expect(result).toEqual(ok(expected));
	});

	test("When invalid user, then returns ZodError", async () => {
		const cases = [
			{
				desc: "Too short name",
				input: { name: "" },
				expected: { code: "too_small" },
			},
			{
				desc: "Too long name",
				input: { name: "a".repeat(101) },
				expected: { code: "too_big" },
			},
		];

		for (const c of cases) {
			const result = signUp(c.input);
			expect(result.isErr()).toBeTrue();

			if (result.isErr()) {
				const err = result.error as ZodError;
				expect(err.errors).toEqual([expect.objectContaining(c.expected)]);
			}
		}
	});
});
