import { describe, expect, test } from "bun:test";
import { eq } from "drizzle-orm";
import { ok } from "neverthrow";

import { createDrizzle, createFakeUser } from "../../test/util";
import { users } from "./schema";

import { UserRepositoryImpl } from "./UserRepository";

describe("save", async () => {
	const db = createDrizzle();
	const repo = new UserRepositoryImpl(db);

	test("When given valid user params, then it should create a user and save", async () => {
		const user = createFakeUser();

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

		const result2 = await repo.save({ ...user, name: "new name" });
		expect(result2).toEqual(ok(null));

		const got2 = await db
			.select()
			.from(users)
			.where(eq(users.id, user.id))
			.get();
		expect(got2).toEqual(
			expect.objectContaining({
				...user,
				name: "new name",
			}),
		);
	});
});
