import { describe, expect, it } from "bun:test";
import { testClient } from "hono/testing";

import { createFakeUser } from "@/test/util";

import { app } from "./RPC";

describe("POST /api/todo", async () => {
	const client = testClient(app);

	it("should return 201 response", async () => {
		const user = await createFakeUser();

		const res = await client.api.todo.$post({
			json: {
				title: "test",
				authorId: user.id,
			},
		});

		expect(res.status).toBe(201);
		expect(await res.json()).toEqual(
			expect.objectContaining({
				title: "test",
				authorId: user.id,
			}),
		);
	});

	it("should return 500 response", async () => {
		const res = await client.api.todo.$post({
			json: {
				title: "test",
				authorId: "unknown", // invalid authorId
			},
		});

		expect(res.status).toBe(500);
		expect(await res.json()).toEqual({ message: "Failed to save todo" });
	});
});
