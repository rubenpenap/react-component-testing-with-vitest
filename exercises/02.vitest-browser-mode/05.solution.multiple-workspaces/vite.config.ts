/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
	plugins: [react()],
	test: {
		workspace: [
			{
				test: {
					name: 'unit',
					globals: true,
					include: ['**/*.test.ts'],
					exclude: ['**/*.browser.test.ts(x)?'],
					environment: 'node',
				},
			},
			{
				test: {
					name: 'browser',
					globals: true,
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
