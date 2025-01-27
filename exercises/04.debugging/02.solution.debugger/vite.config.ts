/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
	plugins: [react()],
	test: {
		name: 'browser',
		globals: true,
		include: ['**/*.browser.test.ts(x)?'],
		browser: {
			enabled: true,
			headless: !process.env.DEBUG,
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
