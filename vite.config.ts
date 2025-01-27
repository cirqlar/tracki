import { defineConfig } from "vite";

import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import vercel from "vite-plugin-vercel";

import path from "path";

const host = process.env.TAURI_DEV_HOST;

const WITHOUT_TAURI = !!(process.env.WITHOUT_TAURI ?? false);

// https://vitejs.dev/config/
export default defineConfig(async () => {
	const baseConfig = {
		plugins: [TanStackRouterVite(), react(), tailwindcss()],
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./src"),
			},
		},
	};

	if (WITHOUT_TAURI) {
		return {
			...baseConfig,
			plugins: [...baseConfig.plugins, vercel()],
			vercel: {
				rewrites: [{ source: "/app/*", destination: "/" }],
			},
		};
	} else {
		return {
			...baseConfig,

			// Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
			//
			// 1. prevent vite from obscuring rust errors
			clearScreen: false,
			// 2. tauri expects a fixed port, fail if that port is not available
			server: {
				port: 1420,
				strictPort: true,
				host: host || false,
				hmr: host
					? {
							protocol: "ws",
							host,
							port: 1421,
						}
					: undefined,
				watch: {
					// 3. tell vite to ignore watching `src-tauri`
					ignored: ["**/src-tauri/**"],
				},
			},
		};
	}
});
