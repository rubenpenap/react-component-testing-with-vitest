/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
	plugins: [react()],
	// 🐨 Add a new property called `workspace`.
	// As the value, provide an array with two entries.
	// 💰 workspace: [{}, {}]
	//
	// 🐨 In the first entry of the `workspace` array,
	// define a `test` property and give it a `test.name` equal to "unit".
	// 💰 { test: { name: 'unit' } }
	//
	// 🐨 In the unit test workspace, set `globals` to true
	// and `environment` to "node".
	//
	// 🐨 Finally, declare `include` and `exclude` properties
	// that decide which test suites to run.
	// Use the "**/*.test.ts" pattern for `include`
	// and "**/*.browser.test.ts(x)?" pattern for `exclude.
	//
	// 🐨 Now, switch to the second entry in the `workspace`
	// array. There, give it the following properties:
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
	test: {
		globals: true,
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
})
