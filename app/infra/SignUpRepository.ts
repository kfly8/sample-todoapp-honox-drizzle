import type { BunSQLiteDatabase } from "drizzle-orm/bun-sqlite";
import { ok } from "neverthrow";

import { users } from "./schema";

import type { Repository, RepositoryParams } from "../cmd/SignUpCmd";

export class SignUpRepository implements Repository {
	#db: BunSQLiteDatabase;

	constructor(db: BunSQLiteDatabase) {
		this.#db = db;
	}

	async save({ user }: RepositoryParams) {
		await this.#db.insert(users).values(user);

		return ok(null);
	}
}
