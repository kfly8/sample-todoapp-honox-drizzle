import { expect, test } from "bun:test";

import { createTodo, createUser } from "./factory";

test("createUser", async () => {
	const user = await createUser({ name: "hello" });

	expect(user).toEqual(
		expect.objectContaining({
			name: "hello",
		}),
	);
});

test("createTodo", async () => {
	const todo = await createTodo({ title: "hello" });

	expect(todo).toEqual(
		expect.objectContaining({
			title: "hello",
		}),
	);
});
