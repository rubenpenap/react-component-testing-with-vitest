/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		workspace: [
			{
				test: {
					name: 'unit',
					include: ['**/*.test.ts'],
					exclude: ['**/*.browser.test.ts(x)?'],
					environment: 'node',
				},
			},
			{
				test: {
					name: 'browser',
					include: ['**/*.browser.test.ts(x)?'],
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
})
