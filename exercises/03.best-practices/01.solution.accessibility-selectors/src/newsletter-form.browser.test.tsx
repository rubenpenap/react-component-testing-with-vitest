import { test, expect } from 'vitest'
import { page, userEvent } from '@vitest/browser/context'
import { render } from 'vitest-browser-react'
import { NewsletterForm } from './newsletter-form.js'

userEvent.setup()

test('submits the newsletter form', async () => {
	render(<NewsletterForm />)

	await expect
		.element(page.getByRole('heading', { name: 'Newsletter' }))
		.toBeVisible()

	const emailInput = page.getByLabelText('Your email')
	await userEvent.fill(emailInput, 'kody@epicweb.dev')

	/**
	 * @note Vitest doesn't support the `normalize` options
	 * you'd normally use to sanitize an element with a broken text.
	 */
	const submitButton = page.getByRole('button', {
		name: 'Join the newsletter',
	})
	await userEvent.click(submitButton)

	/** @todo Assert */
})
