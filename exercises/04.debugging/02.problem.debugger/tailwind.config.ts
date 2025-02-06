import type { Config } from 'tailwindcss'

export default {
	content: ['./index.html', './src/**/*.{ts,tsx}'],
	theme: {
		extend: {
			keyframes: {
				'slide-in': {
					'0%': { transform: 'translateY(50%)' },
					'100%': { transform: 'translateY(0)' },
				},
			},
			animation: {
				'slide-in': 'slide-in .4s',
			},
		},
	},
	plugins: [],
} satisfies Config
