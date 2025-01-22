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
					input: {
						client: "./app/client.ts",
						style: "./app/style.css",
					},
					output: {
						dir: "./dist",
						entryFileNames: "assets/[name].js",
						assetFileNames: "assets/[name].[ext]",
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
