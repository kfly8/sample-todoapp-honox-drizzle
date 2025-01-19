import { describe, expect, it } from "bun:test";
import { testClient } from "hono/testing";

import { createFakeTodo, createFakeUser } from "@/test/util";

import { app } from "../RPC";

describe("PATCH /api/todo/:id", async () => {
	const client = testClient(app);

	it("should return 200 response", async () => {
		const user = await createFakeUser();
		const todo = await createFakeTodo({ authorId: user.id });

		const res = await client.api.todo[":id"].$patch({
			param: {
				id: todo.id,
			},
			json: {
				title: "test",
			},
		});

		expect(res.status).toBe(200);
		expect(await res.json()).toEqual({ id: todo.id, title: "test" });
	});
});
