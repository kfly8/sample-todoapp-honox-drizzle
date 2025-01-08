import { describe, expect, test } from "bun:test";
import { eq } from "drizzle-orm";
import { ok } from "neverthrow";

import { buildFakeUser, createDrizzle } from "../test/util";
import { users } from "./schema";

import { SignUpRepository } from "./SignUpRepository";

describe("SignUpRepository.save", async () => {
	const db = createDrizzle();
	const repo = new SignUpRepository(db);

	test("When given valid user params, then it should create a user and save", async () => {
		const user = buildFakeUser();

		const result = await repo.save(user);
		expect(result).toEqual(ok(null));

		const got = await db
			.select()
			.from(users)
			.where(eq(users.id, user.id))
			.get();
		expect(got).toEqual(
			expect.objectContaining({
				...user,
				createdAt: expect.any(String),
				updatedAt: expect.any(String),
			}),
		);
	});
});
