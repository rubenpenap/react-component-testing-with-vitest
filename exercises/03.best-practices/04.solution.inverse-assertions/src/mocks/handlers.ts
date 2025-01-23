import { delay, http, HttpResponse } from 'msw'
import type { Discount } from '../discount-code-form.js'

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
	http.delete('https://api.example.com/discount/code', async () => {
		await delay(500)
		return new HttpResponse()
	}),
]
