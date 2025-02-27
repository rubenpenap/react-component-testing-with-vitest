import { http, HttpResponse } from 'msw'
import type { Discount } from '../discount-code-form'

export const handlers = [
	http.post<never, string, Discount>(
		'https://api.example.com/discount/code',
		async ({ request }) => {
			const code = await request.text()

			return HttpResponse.json({
				code,
				amount: 20,
			})
		},
	),
]
