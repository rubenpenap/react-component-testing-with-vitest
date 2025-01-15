/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
	plugins: [react()],
	test: {
		workspace: [
			{
				extends: true,
				test: {
					name: 'unit',
					include: ['**/*.test.ts'],
				},
			},
			{
				extends: true,
				test: {
					name: 'browser',
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
