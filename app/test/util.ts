import { faker } from "@faker-js/faker";
import { drizzle } from "drizzle-orm/libsql";

export const createDrizzle = () => {
	// biome-ignore lint/style/noNonNullAssertion: ignore
	return drizzle(process.env.DATABASE_URL!);
};

import { createUserId } from "../domain/user";
import type { User } from "../domain/user";
import { SignUpRepository } from "../infra/SignUpRepository";

export const buildFakeUser = (params: Partial<User> = {}) => {
	const user = {
		id: params.id ?? createUserId(),
		name: params.name ?? faker.person.fullName(),
	};

	return user;
};

export const createFakeUser = async (params: Partial<User> = {}) => {
	const user = buildFakeUser(params);
	const db = createDrizzle();
	const repo = new SignUpRepository(db);

	await repo.save(user);

	return user;
};

import { createTodoId } from "../domain/todo";
import type { Todo } from "../domain/todo";
import { CreateTodoRepository } from "../infra/CreateTodoRepository";

export const buildFakeTodo = (params: Partial<Todo> = {}) => {
	const todo = {
		id: params.id ?? createTodoId(),
		title: params.title ?? faker.lorem.sentence(),
		description: params.description ?? faker.lorem.paragraph(),
		completed: params.completed ?? false,
		authorId: params.authorId ?? createUserId(),
		assigneeIds: params.assigneeIds ?? [],
	};

	return todo;
};

export const createFakeTodo = async (params: Partial<Todo> = {}) => {
	const todo = buildFakeTodo(params);
	const db = createDrizzle();
	const repo = new CreateTodoRepository(db);

	await repo.save(todo);

	return todo;
};
