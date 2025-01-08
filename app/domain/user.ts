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
