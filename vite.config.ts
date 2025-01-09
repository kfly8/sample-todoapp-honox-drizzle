import build from "@hono/vite-build/bun";
import honox from "honox/vite";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [honox(), build()],
	resolve: {
		alias: {
			"@/": "/app/",
		},
	},
});
