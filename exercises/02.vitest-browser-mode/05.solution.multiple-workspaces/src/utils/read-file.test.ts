import { readFile } from './read-file'

test('returns contents of a text file', async () => {
	await expect(readFile(new File(['hello world'], 'file.txt'))).resolves.toBe(
		'hello world',
	)
})

test('returns contents of a buffer file', async () => {
	await expect(
		readFile(new File([new TextEncoder().encode('hello world')], 'file.txt')),
	).resolves.toBe('hello world')
})
