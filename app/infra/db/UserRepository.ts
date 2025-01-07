import type { LibSQLDatabase } from "drizzle-orm/libsql";
import { ok } from "neverthrow";

import type { User } from "../../domain/model/user";
import type { UserRepository } from "../../repository";
import { users } from "./schema";

export class UserRepositoryImpl implements UserRepository {
	#db: LibSQLDatabase;

	constructor(db: LibSQLDatabase) {
		this.#db = db;
	}

	async save(params: User) {
		const { id, ...rest } = params;

		await this.#db.insert(users).values(params).onConflictDoUpdate({
			target: users.id,
			set: rest,
		});

		return ok(null);
	}
}
