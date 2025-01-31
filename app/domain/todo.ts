import { err, ok } from "neverthrow";
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

export type CreateTodoParams = Omit<Todo, "id">;

export function createTodo(params: CreateTodoParams) {
	const todo = {
		...params,
		// default values
		description: params.description ?? "",
		completed: params.completed ?? false,
		assigneeIds: params.assigneeIds ?? [],
		id: createTodoId(),
	};

	const parsed = todoSchema.safeParse(todo);
	if (parsed.error) {
		return err(parsed.error);
	}

	return ok(parsed.data);
}

export type UpdateTodoParams = { id: Todo["id"] } & Partial<CreateTodoParams>;

const partialTodoSchema = todoSchema.partial();

export function updateTodo(params: UpdateTodoParams) {
	const id = params.id;

	const parsed = partialTodoSchema.safeParse(params);
	if (parsed.error) {
		return err(parsed.error);
	}

	const todo = {
		id,
		...parsed.data,
	};

	return ok(todo);
}
