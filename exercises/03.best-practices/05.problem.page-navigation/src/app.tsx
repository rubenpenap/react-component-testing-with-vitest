import { BrowserRouter, Routes, Route } from 'react-router'
import { DiscountCodeForm } from './discount-code-form.js'

export function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<DiscountCodeForm />} />
				<Route
					path="/cart"
					element={
						<div className="text-center">
							<h1 className="mb-2 text-4xl font-bold">Cart</h1>
							<p className="text-slate-600">This is a cart page.</p>
						</div>
					}
				/>
				<Route path="*" element={<p>Page not found</p>} />
			</Routes>
		</BrowserRouter>
	)
}
