import { err, ok } from "neverthrow";
import { z } from "zod";
import { generateId } from "../utils";

export const userIdSchema = z.string().brand<"UserId">();
export type UserId = z.infer<typeof userIdSchema>;
export const createUserId = () => generateId() as UserId;

export const userSchema = z.object({
	id: userIdSchema,
	name: z.string().min(1).max(100),
});

export type User = z.infer<typeof userSchema>;

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
