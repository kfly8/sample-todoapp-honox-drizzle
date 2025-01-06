import { err, ok } from "neverthrow";
import { userSchema } from "../model";
import { createUserId } from "../model";
import type { UserRepository } from "../repository";

export function signUp(repo: UserRepository, name: string) {
	const user = {
		id: createUserId(),
		name,
	};

	const parsed = userSchema.safeParse(user);
	if (parsed.error) {
		return err(parsed.error);
	}

	const saved = repo.save(parsed.data);
	if (saved.isErr()) {
		return err(saved.error);
	}

	return ok(parsed.data);
}
