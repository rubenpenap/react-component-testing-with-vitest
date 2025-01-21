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

	const submitButton = page.getByRole('button', {
		/**
		 * @todo @fixme Find a way to showcase node text sanitization in Vitest.
		 */
		name: 'Join the 📨 newsletter',
	})
	await userEvent.click(submitButton)

	await expect
		.element(page.getByText('Thank you for joining the newsletter!'))
		.toBeVisible()
})
