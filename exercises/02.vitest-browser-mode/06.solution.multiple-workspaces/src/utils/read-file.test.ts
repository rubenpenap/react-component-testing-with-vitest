import { it, expect } from 'vitest'
import { readFile } from './read-file.js'

it('returns contents of a text file', async () => {
	await expect(readFile(new File(['hello world'], 'file.txt'))).resolves.toBe(
		'hello world',
	)
})

it('returns contents of a buffer file', async () => {
	await expect(
		readFile(new File([new TextEncoder().encode('hello world')], 'file.txt')),
	).resolves.toBe('hello world')
})
