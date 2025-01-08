import { ulid } from "ulid";
import { z } from "zod";

export const userIdSchema = z.string().ulid().brand<"UserId">();
export type UserId = z.infer<typeof userIdSchema>;
export const createUserId = () => ulid() as UserId;

export const userSchema = z.object({
	id: userIdSchema,
	name: z.string().min(1).max(100),
});

export type User = z.infer<typeof userSchema>;
