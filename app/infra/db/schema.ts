import { sql } from "drizzle-orm";
import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import * as t from "drizzle-orm/sqlite-core";
import { ulid } from "ulid";

import type { TodoId } from "../../domain/model/todo";
import type { UserId } from "../../domain/model/user";

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
	completed: t.integer({ mode: "boolean" }).default(false),
	authorId: t
		.text("author_id")
		.notNull()
		.references(() => users.id),
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
	id: t.text().notNull().primaryKey().$defaultFn(ulid),
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
