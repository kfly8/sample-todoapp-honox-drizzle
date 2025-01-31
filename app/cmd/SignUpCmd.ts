import { err, ok } from "neverthrow";
import type { Result } from "neverthrow";
import type { Params, User } from "../domain/user";
import { signUp } from "../domain/user";
import type { Cmd } from "./types";

export type RepositoryParams = {
	user: User;
};

export interface Repository {
	save(params: RepositoryParams): Promise<Result<null, Error>>;
}

export class SignUpCmd implements Cmd {
	constructor(private repo: Repository) {
		this.repo = repo;
	}

	async execute(params: Params) {
		const result = signUp(params);
		if (result.isErr()) {
			return err(new Error("Failed to signUp", { cause: result.error }));
		}
		const user = result.value;

		const saved = await this.repo.save({ user });
		if (saved.isErr()) {
			return err(new Error("Failed to save user", { cause: saved.error }));
		}

		return ok(user);
	}
}
