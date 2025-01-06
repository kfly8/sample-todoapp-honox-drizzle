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

export const todoIdSchema = z.string().ulid().brand<"TodoId">();
export type TodoId = z.infer<typeof todoIdSchema>;
export const createTodoId = () => ulid() as TodoId;

export const todoSchema = z.object({
	id: todoIdSchema,
	title: z.string().min(1).max(100),
	description: z.string().max(1000).optional(),
	completed: z.boolean().optional(),
	authorId: userIdSchema,
	assigneeIds: z.array(userIdSchema).optional(),
});

export type Todo = z.infer<typeof todoSchema>;
