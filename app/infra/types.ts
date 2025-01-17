import type { ExtractTablesWithRelations } from "drizzle-orm";
import type { BunSQLiteDatabase } from "drizzle-orm/bun-sqlite";
import type { SQLiteTransaction } from "drizzle-orm/sqlite-core";

export type DB = BunSQLiteDatabase;

export type TX = SQLiteTransaction<
	"sync",
	void,
	Record<string, never>,
	ExtractTablesWithRelations<Record<string, never>>
>;
