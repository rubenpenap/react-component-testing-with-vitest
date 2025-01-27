import { page } from '@vitest/browser/context'
import { render } from 'vitest-browser-react'
import { TicTacToe } from './tic-tac-toe.js'

test('places cross marks in a horizontal line', async () => {
	render(<TicTacToe />)

	await page.getByRole('button', { name: 'left middle' }).click()
	await page.getByRole('button', { name: 'middle', exact: true }).click()
	await page.getByRole('button', { name: 'right middle' }).click()

	// 🐨 Set a breakpoint after the test has interacted with the component.
	// 💰 Use your IDE instead of modifying the test file.

	const squares = page.getByRole('button').elements().slice(3, 6)
	expect(squares.map((element) => element.textContent)).toEqual(['✗', '✗', '✗'])
})
