import type { LibSQLDatabase } from "drizzle-orm/libsql";
import { ok } from "neverthrow";

import type { User } from "../domain/model/user";
import { users } from "./schema";

import type { Repository } from "../cmd/SignUpCmd";

export class SignUpRepository implements Repository {
	#db: LibSQLDatabase;

	constructor(db: LibSQLDatabase) {
		this.#db = db;
	}

	async save(params: User) {
		await this.#db.insert(users).values(params);

		return ok(null);
	}
}
