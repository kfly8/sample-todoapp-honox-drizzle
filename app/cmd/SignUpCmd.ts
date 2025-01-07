import { err, ok } from "neverthrow";
import { signUp } from "../domain/service/user";
import type { Params } from "../domain/service/user";
import type { UserRepository } from "../repository";

export class SignUpCmd {
	constructor(private repo: UserRepository) {
		this.repo = repo;
	}

	async execute(params: Params) {
		const result = signUp(params);
		if (result.isErr()) {
			return err(new Error("Failed to signUp", { cause: result.error }));
		}
		const user = result.value;

		const saved = await this.repo.save(user);
		if (saved.isErr()) {
			return err(new Error("Failed to save user", { cause: saved.error }));
		}

		return ok(user);
	}
}
