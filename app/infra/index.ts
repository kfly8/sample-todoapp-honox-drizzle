import { drizzle } from "drizzle-orm/libsql";

import { CreateTodoRepository } from "./CreateTodoRepository";
import { SignUpRepository } from "./SignUpRepository";

const createDrizzle = () => {
	// biome-ignore lint/style/noNonNullAssertion: ignore
	return drizzle(process.env.DATABASE_URL!);
};

export const newSignUpRepository = () => {
	return new SignUpRepository(createDrizzle());
};
export const newCreateTodoRepository = () => {
	return new CreateTodoRepository(createDrizzle());
};
