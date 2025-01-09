import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";

import { CreateTodoRepository } from "./CreateTodoRepository";
import { SignUpRepository } from "./SignUpRepository";

export const createSqlite = () => {
	// biome-ignore lint/style/noNonNullAssertion: ignore
	return new Database(process.env.DATABASE_URL!);
};

export const createDrizzle = () => {
	return drizzle({ client: createSqlite() });
};

export const newSignUpRepository = () => {
	return new SignUpRepository(createDrizzle());
};
export const newCreateTodoRepository = () => {
	return new CreateTodoRepository(createDrizzle());
};
