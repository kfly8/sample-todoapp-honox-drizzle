import { z } from "zod";
import { generateId } from "../utils";

import { userIdSchema } from "./user";

export const todoIdSchema = z.string().brand<"TodoId">();
export type TodoId = z.infer<typeof todoIdSchema>;
export const createTodoId = () => generateId() as TodoId;

export const todoSchema = z.object({
	id: todoIdSchema,
	title: z.string().min(1).max(100),
	description: z.string().max(1000).optional(),
	completed: z.boolean().optional(),
	authorId: userIdSchema,
	assigneeIds: z.array(userIdSchema).optional(),
});

export type Todo = z.infer<typeof todoSchema>;
