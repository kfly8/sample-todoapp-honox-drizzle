import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";

import { CreateTodoRepository } from "./CreateTodoRepository";
import { SignUpRepository } from "./SignUpRepository";
import { UpdateTodoRepository } from "./UpdateTodoRepository";

export const createDatabase = () => {
	// biome-ignore lint/style/noNonNullAssertion: ignore
	const path = import.meta.env.VITE_DATABASE_PATH!;

	const db = new Database(path, { strict: true });

	db.exec(`
		PRAGMA foreign_keys= 1;
		PRAGMA journal_mode = WAL;
	`);

	return db;
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
export const newUpdateTodoRepository = () => {
	return new UpdateTodoRepository(createDrizzle());
};
