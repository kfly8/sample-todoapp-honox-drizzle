import { faker } from "@faker-js/faker";
import { drizzle } from "drizzle-orm/libsql";

export const createDrizzle = () => {
	// biome-ignore lint/style/noNonNullAssertion: ignore
	return drizzle(process.env.DATABASE_URL!);
};

import { createUserId } from "../domain/model/user";
import type { User } from "../domain/model/user";

export const createFakeUser = (params: Partial<User> = {}) => {
	const user = {
		id: params.id ?? createUserId(),
		name: params.name ?? faker.person.fullName(),
	};

	return user;
};

import { createTodoId } from "../domain/model/todo";
import type { Todo } from "../domain/model/todo";

export const createFakeTodo = (params: Partial<Todo> = {}) => {
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
