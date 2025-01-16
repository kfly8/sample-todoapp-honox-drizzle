import { sql } from "drizzle-orm";
import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import * as t from "drizzle-orm/sqlite-core";
import { generateId } from "../utils";

import type { TodoId } from "../domain/todo";
import type { UserId } from "../domain/user";

// utils
const createdAt = t.text("created_at").default(sql`(CURRENT_TIMESTAMP)`);
const updatedAt = t
	.text("updated_at")
	.default(sql`(CURRENT_TIMESTAMP)`)
	.$onUpdate(() => sql`(CURRENT_TIMESTAMP)`);

export const todos = table("todos", {
	id: t.text().notNull().primaryKey().$type<TodoId>(),
	title: t.text().notNull(),
	description: t.text(),
	completed: t.integer({ mode: "boolean" }).notNull(),
	authorId: t
		.text("author_id")
		.notNull()
		.references(() => users.id)
		.$type<UserId>(),
	createdAt,
	updatedAt,
});

export const users = table("users", {
	id: t.text().notNull().primaryKey().$type<UserId>(),
	name: t.text().notNull(),
	createdAt,
	updatedAt,
});

export const todoAssignees = table("todo_assignees", {
	id: t.text().notNull().primaryKey().$defaultFn(generateId),
	todoId: t
		.text()
		.notNull()
		.references(() => todos.id)
		.$type<TodoId>(),
	userId: t
		.text()
		.notNull()
		.references(() => users.id)
		.$type<UserId>(),
	createdAt,
	updatedAt,
});
