import { useMemo } from 'react'
import { DiscountCodeForm } from './discount-code-form.js'

export function App() {
	const location = useMemo(() => {
		return window.location
	}, [])

	switch (location.pathname) {
		case '/': {
			return <DiscountCodeForm />
		}

		case '/cart': {
			return (
				<div className="text-center">
					<h1 className="mb-2 text-4xl font-bold">Cart</h1>
					<p className="text-slate-600">This is a cart page.</p>
				</div>
			)
		}

		default: {
			return <p>Page not found</p>
		}
	}
}
