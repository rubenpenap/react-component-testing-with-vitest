import { page } from '@vitest/browser/context'
import { render } from 'vitest-browser-react'
import { TicTacToe } from './tic-tac-toe.js'

test('places cross marks in a horizontal line', async () => {
	const { debug } = render(<TicTacToe />)

	await page.getByRole('button', { name: 'left middle' }).click()
	await page.getByRole('button', { name: 'middle', exact: true }).click()
	await page.getByRole('button', { name: 'right middle' }).click()

	debug()

	const squares = page.getByRole('button').elements().slice(3, 6)
	expect(squares.map((element) => element.textContent)).toEqual(['✗', '✗', '✗'])
})

test('...', async () => {
	/**
	 * @fixme @todo
	 */
	// A bunch of video thumbnails that render a lot of UI
	// but you are interested only in certain elements, like "Watch now" links.
	//
	// OR any kind of list with interactive elements like buttons next to each element.
	const { debug } = render(
		<VideoFeed>
			<Video />
			<Video />
			<Video />
			<Video />
			<Video />
		</VideoFeed>,
	)

	// A large component tree and we can print all elements
	// matching this role.
	// debug(page.getByRole('button').all())
})
