import { page, userEvent } from '@vitest/browser/context'
import { render } from 'vitest-browser-react'
import { http, HttpResponse } from 'msw'
import { DiscountCodeForm, type Discount } from './discount-code-form.js'

import { worker } from './mocks/browser.js'

beforeAll(async () => {
	await worker.start({
		quiet: true,
		/**
		 * @fixme @todo Better Vitest integration.
		 * This has to be defined once for all tests.
		 * Global setup can use `provide` but runs in Node.js.
		 * Scoped setup can NOT use `provide` but runs in the browser.
		 */
		onUnhandledRequest(request, print) {
			if (/(\.woff2?)$/.test(request.url)) {
				return
			}
			print.warning()
		},
	})
})

afterEach(() => {
	worker.resetHandlers()
})

afterAll(async () => {
	worker.stop()
})

test('applies a discount code', async () => {
	render(<DiscountCodeForm />)

	const codeInput = page.getByLabelText('Discount code')
	await userEvent.fill(codeInput, 'EPIC2025')

	const submitButton = page.getByRole('button', {
		name: 'Apply discount',
	})
	await userEvent.click(submitButton)

	await expect
		.element(page.getByText('Discount: EPIC2025 (-20%)'))
		.toBeVisible()
})

test('displays a warning on legacy discount codes', async () => {
	worker.use(
		http.post<never, string, Discount>(
			'https://api.example.com/discount/code',
			async ({ request }) => {
				const code = await request.text()

				return HttpResponse.json({
					code,
					amount: 10,
					isLegacy: true,
				})
			},
		),
	)

	render(<DiscountCodeForm />)

	const codeInput = page.getByLabelText('Discount code')
	await userEvent.fill(codeInput, 'LEGA2000')

	const submitButton = page.getByRole('button', {
		name: 'Apply discount',
	})
	await userEvent.click(submitButton)

	await expect
		.element(page.getByText('Discount: LEGA2000 (-10%)'))
		.toBeVisible()
	await expect
		.element(
			page.getByText('"LEGA2000" is a legacy code. Discount amount halfed.'),
			/**
			 * @todo @fixme Use the role-based selector when the Vitest bug is fixed.
			 * @see https://github.com/vitest-dev/vitest/issues/7327
			 */
			// page.getByRole('alert', {
			// 	name: '"LEGA2000" is a legacy code. Discount amount halfed.',
			// }),
		)
		.toBeVisible()
})

test('displays an error when fetching the discount code', async () => {
	worker.use(
		http.post('https://api.example.com/discount/code', () => {
			return new HttpResponse(null, { status: 500 })
		}),
	)

	render(<DiscountCodeForm />)

	const codeInput = page.getByLabelText('Discount code')
	await userEvent.fill(codeInput, 'CODE1234')

	const submitButton = page.getByRole('button', {
		name: 'Apply discount',
	})
	await userEvent.click(submitButton)

	await expect
		.element(
			page.getByText('Failed to apply the discount code'),
			// page.getByRole('alert', { name: 'Failed to apply the discount code' }),
		)
		.toBeVisible()
})
