/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
	plugins: [react(), tailwindcss()],
	server: {
		port: process.env.PORT ? Number(process.env.PORT) : undefined,
	},
	test: {
		globals: true,
		browser: {
			enabled: true,
			provider: 'playwright',
			instances: [
				{
					browser: 'chromium',
				},
			],
		},
	},
})
