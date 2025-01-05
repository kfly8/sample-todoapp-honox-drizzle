import {} from "hono";

type Head = {
	title?: string;
};

declare module "hono" {
	interface Env {
		Variables: {};
		Bindings: {};
	}
	type ContextRenderer = (
		content: string | Promise<string>,
		head?: Head,
	) => Response | Promise<Response>;
}
