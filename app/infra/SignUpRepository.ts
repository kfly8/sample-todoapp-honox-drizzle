import type { LibSQLDatabase } from "drizzle-orm/libsql";
import { ok } from "neverthrow";

import { users } from "./schema";

import type { Repository, RepositoryParams } from "../cmd/SignUpCmd";

export class SignUpRepository implements Repository {
	#db: LibSQLDatabase;

	constructor(db: LibSQLDatabase) {
		this.#db = db;
	}

	async save({ user }: RepositoryParams) {
		await this.#db.insert(users).values(user);

		return ok(null);
	}
}
