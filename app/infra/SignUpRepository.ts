import { ok } from "neverthrow";

import { users } from "./schema";
import type { DB, TX } from "./types";

import type { Repository, RepositoryParams } from "../cmd/SignUpCmd";

type User = RepositoryParams["user"];

export class SignUpRepository implements Repository {
	#db: DB;

	constructor(db: DB) {
		this.#db = db;
	}

	async save({ user }: RepositoryParams) {
		await this.#db.transaction(async (tx) => {
			await saveUser(tx, user);
		});

		return ok(null);
	}
}

async function saveUser(tx: TX, user: User) {
	await tx.insert(users).values(user);
}
