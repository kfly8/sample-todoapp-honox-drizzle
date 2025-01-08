import { ulid } from "ulid";
import { z } from "zod";

import { userIdSchema } from "./user";

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
