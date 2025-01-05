import { faker } from "@faker-js/faker";
import { drizzle } from "drizzle-orm/libsql";

import { TodoRepository } from "../infra/db/repository/TodoRepository";
import { UserRepository } from "../infra/db/repository/UserRepository";

type CreateUserParams = Partial<Parameters<UserRepository["createUser"]>[0]>;

export const createUser = async (args: CreateUserParams = {}) => {
	const db = drizzle(process.env.DATABASE_URL!);
	const userRepo = new UserRepository(db);

	const data = {
		name: args.name ?? faker.person.fullName(),
	};

	const userResult = await userRepo.createUser(data);

	if (userResult.isErr()) {
		throw new Error(userResult.error);
	}

	return userResult.value;
};

type CreateTodoParams = Partial<Parameters<TodoRepository["createTodo"]>[0]>;

export const createTodo = async (args: CreateTodoParams = {}) => {
	const db = drizzle(process.env.DATABASE_URL!);
	const todoRepo = new TodoRepository(db);

	const user = await createUser();

	const data = {
		description: args.description ?? faker.lorem.paragraph(),
		title: args.title ?? faker.lorem.sentence(),
		completed: args.completed ?? false,
		authorId: args.authorId ?? user.id,
	};

	const todoResult = await todoRepo.createTodo(data);

	if (todoResult.isErr()) {
		throw new Error(todoResult.error);
	}

	return todoResult.value;
};
