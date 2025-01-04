import 'dotenv/config'

import { ok, err } from 'neverthrow'
import { drizzle } from 'drizzle-orm/libsql';
import { eq } from 'drizzle-orm';

import { todos, createTodoId, TodoId } from './schema'

const db = drizzle({ connection: {
  url: process.env.DATABASE_URL!,
}});

type TodoInsert = typeof todos.$inferInsert;

export const createTodo = async (data : TodoInsert) => {
  const values = { ...data, id: createTodoId() }
  const todo = await db.insert(todos).values(values).returning().get()
  return ok(todo)
}

type TodoUpdate = Partial<TodoInsert>

export const updateTodo = async (id: TodoId, data: TodoUpdate) => {
  if (Object.keys(data).length === 0) {
    return ok(undefined)
  }

  const todo = await db.update(todos).set(data).where(eq(todos.id,id)).returning().get()
  if (todo === undefined) {
    return err(`Todo with id ${id} not found`)
  }
  return ok(todo)
}
