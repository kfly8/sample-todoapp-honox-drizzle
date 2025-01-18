import { describe, expect, it } from "bun:test";
import { testClient } from "hono/testing";

import { createFakeUser } from "@/test/util";
import { app } from "./RPC";

describe("POST /api/todo", async () => {
	const client = testClient(app);

	it("should return 201 response", async () => {
		const res = await client.api.todo.$post({
			json: {
				title: "test",
				authorId: "unknown",
			},
		});

		expect(res.status).toBe(500);
	});

	it("should return 201 response", async () => {
		const user = await createFakeUser();

		const res = await client.api.todo.$post({
			json: {
				title: "test",
				authorId: user.id,
			},
		});

		expect(res.status).toBe(201);
		// TODO fetch todo and check if it's saved
	});
});
