import type { Todo as DomainTodo } from "@/domain/todo";
import type { User as DomainUser } from "@/domain/user";

// This island use these domain types

export type User = Pick<DomainUser, "id" | "name">;
export type Todo = Pick<DomainTodo, "id" | "title" | "authorId" | "completed">;
