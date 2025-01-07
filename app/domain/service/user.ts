import { err, ok } from "neverthrow";
import { createUserId, userSchema } from "../model/user";
import type { User } from "../model/user";

export type Params = Omit<User, "id">;

export function signUp(params: Params) {
	const user = {
		...params,
		id: createUserId(),
	};

	const parsed = userSchema.safeParse(user);
	if (parsed.error) {
		return err(parsed.error);
	}

	return ok(parsed.data);
}
