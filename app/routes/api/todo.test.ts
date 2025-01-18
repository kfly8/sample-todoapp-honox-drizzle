import { describe, expect, it } from "bun:test";
import { testClient } from "hono/testing";

import { app } from "./RPC";

describe("POST /api/todo", async () => {
	const client = testClient(app);

	it("should return 201 response", async () => {
		const res = await client.api.todo.$post({
			json: {
				// TODO: authorId doesn't exists in database, so it should return 500, foreign key constraint.
				title: "test",
				authorId: "test",
			},
		});

		expect(res.status).toBe(201);
	});

	it("should return 400 response", async () => {
		const res = await client.api.todo.$post({
			json: {
				title: "",
				authorId: "",
			},
		});

		// TODO: zod-validator returns 400 status code, but type doesn't accepts it
		// @ts-ignore
		expect(res.status).toBe(400);
	});
});
