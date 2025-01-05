import { describe, expect, test } from "bun:test";
import { drizzle } from "drizzle-orm/libsql";
import { err, ok } from "neverthrow";

import { createTodo, createUser } from "../../../test/factory";
import type { TodoId } from "../schema";
import { TodoRepository } from "./TodoRepository";

const createTodoRepository = () => {
	const db = drizzle(process.env.DATABASE_URL!);
	const todoRepo = new TodoRepository(db);
	return todoRepo;
};

describe("createTodo", async () => {
	const todoRepo = createTodoRepository();
	const user = await createUser();

	test("Create a todo", async () => {
		const todoResult = await todoRepo.createTodo({
			title: "Buy milk",
			authorId: user.id,
		});

		expect(todoResult).toEqual(
			ok(
				expect.objectContaining({
					title: "Buy milk",
					authorId: user.id,
					completed: false,
				}),
			),
		);
	});
});

describe("updateTodo", async () => {
	const todoRepo = createTodoRepository();

	test("When arguments is empty, then return ok(undefined)", async () => {
		const todo = await createTodo();
		const todoResult = await todoRepo.updateTodo(todo.id, {});

		expect(todoResult).toEqual(ok(undefined));
	});

	test("When arguments is given, then return ok(todo)", async () => {
		const user = await createUser();
		const todo = await createTodo();

		const data = {
			title: "Buy milk",
			description: "Buy milk at the grocery store",
			authorId: user.id,
		};

		const todoResult = await todoRepo.updateTodo(todo.id, data);
		expect(todoResult).toEqual(ok(expect.objectContaining(data)));
	});

	test("When todo is not found, then return err", async () => {
		const todoResult = await todoRepo.updateTodo("hello" as TodoId, {
			title: "Buy milk",
		});

		expect(todoResult).toEqual(err(new Error("Todo not found: hello")));
	});
});
