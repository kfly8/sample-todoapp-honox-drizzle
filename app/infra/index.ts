import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";

import { CreateTodoRepository } from "./CreateTodoRepository";
import { SignUpRepository } from "./SignUpRepository";

export const createDatabase = () => {
	// biome-ignore lint/style/noNonNullAssertion: ignore
	return new Database(import.meta.env.VITE_DATABASE_URL!);
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
