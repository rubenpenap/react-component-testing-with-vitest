import { it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { FilePreview } from './file-preview.tsx'

it('displays the preview card', async () => {
	render(<FilePreview file={new File(['hello world'], 'message.txt')} />)

	expect(screen.getByText('message.txt')).toBeTruthy()
	expect(screen.getByText('hello world')).toBeTruthy()
})
