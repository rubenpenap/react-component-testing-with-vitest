import { http, HttpResponse } from 'msw'
import type {
	DiscountCodeRequest,
	DiscountCodeResponse,
} from '../discount-code-form.js'

export const handlers = [
	http.post<never, DiscountCodeRequest, DiscountCodeResponse>(
		'https://api.example.com/discount/code',
		async ({ request }) => {
			const { code } = await request.json()

			return HttpResponse.json({
				code,
				amount: 20,
			})
		},
	),
]
