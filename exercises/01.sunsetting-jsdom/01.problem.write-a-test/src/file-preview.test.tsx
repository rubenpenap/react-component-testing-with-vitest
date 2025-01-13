import { it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { FilePreview } from './file-preview.tsx'

userEvent.setup()

it('renders a preview card for the given file', async () => {
	render(<FilePreview file={new File(['hello world'], 'message.txt')} />)

	expect(screen.getByText('message.txt')).toBeTruthy() /** @todo */
})
