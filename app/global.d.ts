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
	interface ContextRenderer {
		// biome-ignore lint/style/useShorthandFunctionType: この整形をすると別の型エラーが発生した為、無視
		(
			content: string | Promise<string>,
			head?: Head,
		): Response | Promise<Response>;
	}
}
