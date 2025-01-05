import { ok, err } from 'neverthrow'
import type { LibSQLDatabase } from 'drizzle-orm/libsql';
import { todos, createTodoId, TodoId } from '../schema'
import { eq } from 'drizzle-orm';

type TodoInsert = Pick<typeof todos.$inferInsert, 'title' | 'description' | 'completed' | 'authorId'>
type TodoUpdate = Partial<TodoInsert>

export class TodoRepository {
  #db: LibSQLDatabase

  constructor(db: LibSQLDatabase) {
    this.#db = db
  }

  async createTodo(data: TodoInsert) {
    const values = { ...data, id: createTodoId() }
    const todo = await this.#db.insert(todos).values(values).returning().get()
    return ok(todo)
  }

  async updateTodo(id: TodoId, data: TodoUpdate) {
    if (Object.keys(data).length === 0) {
      return ok(undefined)
    }

    const todo = await this.#db.update(todos).set(data).where(eq(todos.id, id)).returning().get()
    if (todo === undefined) {
      return err(new Error(`Todo not found: ${id}`))
    }
    return ok(todo)
  }
}
