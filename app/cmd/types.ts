import type { Result } from "neverthrow";

export interface Cmd {
	execute(params: unknown): Promise<Result<unknown, Error>>;
}
