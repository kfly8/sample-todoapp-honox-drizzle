import {} from "hono";

type Head = {
	title?: string;
};

declare module "hono" {
	interface Env {
		// biome-ignore lint/complexity/noBannedTypes: TODO
		Variables: {};
		// biome-ignore lint/complexity/noBannedTypes: TODO
		Bindings: {};
	}
	type ContextRenderer = (
		content: string | Promise<string>,
		head?: Head,
	) => Response | Promise<Response>;
}
