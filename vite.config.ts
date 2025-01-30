import tailwindcss from "@tailwindcss/vite";
import honox from "honox/vite";
import { defineConfig } from "vite";
import type { UserConfig } from "vite";
import build from "./vite-build";

export default defineConfig(({ mode }) => {
	let config: UserConfig;
	if (mode === "client") {
		config = {
			plugins: [tailwindcss()],
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
				minify: true,
			},
		};
	} else {
		config = {
			plugins: [
				tailwindcss(),
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
