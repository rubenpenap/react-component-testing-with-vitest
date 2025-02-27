import { page } from '@vitest/browser/context'
import { render } from 'vitest-browser-react'
import { TicTacToe } from './tic-tac-toe'

test('places cross marks in a horizontal line', async () => {
	render(<TicTacToe />)

	await page.getByRole('button', { name: 'left middle' }).click()
	// 💣 Remove this debugger statement.
	debugger
	// 🐨 Instead, put a breakpoint on the next line by clicking
	// on the gutter next to the line number in your IDE.

	await page.getByRole('button', { name: 'middle', exact: true }).click()
	// 💣 Repeat the same steps here.
	debugger

	await page.getByRole('button', { name: 'right middle' }).click()
	// 💣 Repeat the same steps here.
	debugger

	const squares = page.getByRole('button').elements().slice(3, 6)
	expect(squares.map((element) => element.textContent)).toEqual(['✗', '✗', '✗'])
})
