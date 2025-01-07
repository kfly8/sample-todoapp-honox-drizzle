import type { Result } from "neverthrow";
import type { Todo } from "./domain/model/todo";
import type { User } from "./domain/model/user";

export interface UserRepository {
	save(params: User): Promise<Result<null, Error>>;
}

export interface TodoRepository {
	save(params: Todo): Promise<Result<null, Error>>;
}
