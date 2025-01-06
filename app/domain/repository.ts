import type { Result } from "neverthrow";
import type { Todo, User } from "./model";

export interface TodoRepository {
	save(todo: Todo): Result<null, Error>;
}

export interface UserRepository {
	save(user: User): Result<null, Error>;
}
