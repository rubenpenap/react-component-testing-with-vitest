/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		browser: {
			enabled: true,
			// 🐨 Set a custom browser provider via the `provider` option.
			// 💰 provider: 'playwright',
			instances: [
				{
					browser: 'chromium',
				},
			],
		},
	},
})
