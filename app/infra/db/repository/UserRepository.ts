import { ok } from 'neverthrow'
import type { LibSQLDatabase } from 'drizzle-orm/libsql';
import { users, createUserId } from '../schema'

type UserInsert = Pick<typeof users.$inferInsert, 'name'>

export class UserRepository  {
  #db: LibSQLDatabase

  constructor(db: LibSQLDatabase) {
    this.#db = db
  }

  async createUser(data: UserInsert) {
    const values = { ...data, id: createUserId() }
    const user = await this.#db.insert(users).values(values).returning().get()
    return ok(user)
  }
}
