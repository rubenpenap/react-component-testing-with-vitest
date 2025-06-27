import { useState } from 'react'

export function TicTacToe() {
	return (
		<div className="grid grid-cols-3 grid-rows-3">
			<Button aria-label="top left" className="border-t-0 border-l-0" />
			<Button aria-label="top middle" className="border-t-0" />
			<Button aria-label="top right" className="border-t-0 border-r-0" />
			<Button aria-label="left middle" className="border-l-0" />
			<Button aria-label="middle" />
			<Button aria-label="right middle" className="border-b-0 border-l-0" />
			<Button aria-label="bottom left" className="border-r-0" />
			<Button aria-label="bottom middle" className="border-b-0" />
			<Button aria-label="bottom right" className="border-r-0 border-b-0" />
		</div>
	)
}

function Button(
	props: Omit<
		React.DetailedHTMLProps<
			React.ButtonHTMLAttributes<HTMLButtonElement>,
			HTMLButtonElement
		>,
		'children' | 'onClick'
	>,
) {
	const [selected, setSelected] = useState(false)
	const text = selected ? '✗' : ''

	return (
		<button
			{...props}
			className={[
				'size-16 border border-slate-400 text-4xl text-blue-500 hover:bg-slate-200',
			]
				.concat(props.className || '')
				.join(' ')}
			onClick={() => setSelected(!selected)}
		>
			{text}
		</button>
	)
}
