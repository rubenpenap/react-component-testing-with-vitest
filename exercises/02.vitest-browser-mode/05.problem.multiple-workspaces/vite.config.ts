/// <reference types="vitest" />
import { defineConfig } from 'vite'
import { configDefaults } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
	plugins: [react(), tailwindcss()],
	server: {
		port: process.env.PORT ? Number(process.env.PORT) : undefined,
	},
	test: {
		workspace: [
			{
				test: {
					name: 'unit',
					globals: true,
					environment: 'node',
					include: ['.src/**/*.test.ts'],
					exclude: [
						...configDefaults.exclude,
						'./src/**/*.browser.test.ts(x)?',
					],
				},
			},
			{
				extends: true,
				test: {
					name: 'browser',
					globals: true,
					include: ['./src/**/*.browser.test.ts(x)?'],
					browser: {
						enabled: true,
						provider: 'playwright',
						instances: [
							{
								browser: 'chromium',
								setupFiles: ['./vitest.browser.setup.ts'],
							},
						],
					},
				},
			},
		],
	},
	//
	// 🐨 Add the `include` property and set it to an array
	// with the only entry "**/*.test.ts".
	//
	// 🐨 Since "**/*.test.ts" will match ALL tests, exclude
	// the browser tests by providing the `exclude` property
	// and including the browser test pattern there.
	// 🦉 Vitest workspaces override the default configuration,
	// which means that the `exclude` array must include the
	// default values to ignore tests from `node_modules`, for example.
	// 💰 exclude: [...defaultConfig.exclude, '**/*.browser.test.ts(x)?']
	//
	// Now, switch to the second entry in the `workspace` array.
	// 🐨 First, set the `extends` property to `true`. Let's extend the
	// root-level options, like `plugins` to have consistent behavior in prod and tests.
	// 💰 { extends: true, test: {} }
	//
	// 🐨 Next, add these properties to the `test` in this workspace:
	// {
	//   name: "browser",
	//   globals: true,
	//   include: ["**/*.browser.test.ts(x)?"]
	// }
	//
	// 🐨 Finally, copy the existing `browser` configuration
	// under the `test` property of the second workspace.
	// 💰 { test: { name: 'browser', browser: {...} }}
	//
	// 💣 Delete this root-level `test` property altogether.
	// test: {
	// 	globals: true,
	// 	browser: {
	// 		enabled: true,
	// 		provider: 'playwright',
	// 		instances: [
	// 			{
	// 				browser: 'chromium',
	// 				setupFiles: ['./vitest.browser.setup.ts'],
	// 			},
	// 		],
	// 	},
	// },
})
