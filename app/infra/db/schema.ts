import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import * as t from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { ulid } from "ulid";

// utils
const createdAt = t.text("created_at").default(sql`(CURRENT_TIMESTAMP)`);
const updatedAt = t.text("updated_at").default(sql`(CURRENT_TIMESTAMP)`).$onUpdate(() => sql`(CURRENT_TIMESTAMP)`);

export type TodoId = string & { __brand: "TodoId" };
export const createTodoId = () => ulid() as TodoId;

export const todos = table("todos", {
  id: t.text().notNull().primaryKey().$type<TodoId>(),
  title: t.text().notNull(),
  description: t.text(),
  completed: t.integer({ mode: 'boolean' }).default(false),
  authorId: t.text('author_id').notNull().references( () => users.id),
  createdAt,
  updatedAt,
});

export type UserId = string & { __brand: "UserId" };
export const createUserId = () => ulid() as UserId;

export const users = table("users", {
  id: t.text().notNull().primaryKey().$type<UserId>(),
  name: t.text().notNull(),
  createdAt,
  updatedAt,
});

export const todoAssignees = table("todo_assignees", {
  id: t.text().notNull().primaryKey().$defaultFn(ulid),
  todoId: t.text().notNull().references(() => todos.id),
  userId: t.text().notNull().references(() => users.id),
  createdAt,
  updatedAt,
});
