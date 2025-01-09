import build from "@hono/vite-build/bun";
import honox from "honox/vite";
import { defineConfig } from "vite";
import type { UserConfig } from "vite";

export default defineConfig(({ mode }) => {
	let config: UserConfig;
	if (mode === "client") {
		config = {
			build: {
				rollupOptions: {
					input: "./app/client.ts",
					output: {
						dir: "./dist/static",
						entryFileNames: "client.js",
					},
				},
				copyPublicDir: false,
			},
		};
	} else {
		config = {
			plugins: [
				honox(),
				build({
					minify: false,
				}),
			],
			resolve: {
				alias: {
					"@/": "/app/",
				},
			},
		};
	}
	return config;
});
