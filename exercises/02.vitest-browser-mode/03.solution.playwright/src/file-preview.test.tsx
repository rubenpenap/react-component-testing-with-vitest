import { it, expect } from 'vitest'
import { page } from '@vitest/browser/context'
import { render } from 'vitest-browser-react'
import { FilePreview } from './file-preview.tsx'

it('displays the preview card', async () => {
	render(<FilePreview file={new File(['hello world'], 'file.txt')} />)

	await expect.element(page.getByText('file.txt')).toBeTruthy()
	await expect.element(page.getByText('hello world')).toBeTruthy()
})
