import basePlugin from "@hono/vite-build";
import type { Plugin } from "vite";

type PluginOptions = Parameters<typeof basePlugin>[0];

const buildPlugin = (options: PluginOptions): Plugin => {
	return {
		...basePlugin({
			...options,
		}),
		name: "sample-todoapp/vite-build",
	};
};

export default buildPlugin;
