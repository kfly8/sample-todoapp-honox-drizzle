import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";

import { CreateTodoRepository } from "./CreateTodoRepository";
import { SignUpRepository } from "./SignUpRepository";

export const createDatabase = () => {
	// biome-ignore lint/style/noNonNullAssertion: ignore
	const path = import.meta.env.VITE_DATABASE_PATH!;
	return new Database(path);
};

export const createDrizzle = () => {
	return drizzle(createDatabase());
};

export const newSignUpRepository = () => {
	return new SignUpRepository(createDrizzle());
};
export const newCreateTodoRepository = () => {
	return new CreateTodoRepository(createDrizzle());
};
