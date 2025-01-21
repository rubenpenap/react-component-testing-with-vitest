import { useReducer, useState, type FormEventHandler } from 'react'

interface Discount {
	code: string
	amount: number
	warning?: string
}

type DiscountFormState =
	| { submitting: false; discount?: never; error?: never }
	| { submitting: true }
	| { submitting: false; discount: Discount; error?: never }
	| { submitting: false; discount?: never; error?: string }

type DiscountFormAction =
	| { type: 'idle' }
	| { type: 'submitting' }
	| { type: 'success'; discount: Discount }
	| { type: 'error'; error: string }

function discountFormReducer(
	_state: DiscountFormState,
	action: DiscountFormAction,
): DiscountFormState {
	switch (action.type) {
		case 'idle': {
			return {
				submitting: false,
			}
		}
		case 'submitting': {
			return {
				submitting: true,
			}
		}
		case 'success': {
			return {
				submitting: false,
				discount: action.discount,
			}
		}
		case 'error': {
			return {
				submitting: false,
				error: action.error,
			}
		}
	}
}

async function fetchDiscount(code: string): Promise<Discount> {
	await new Promise((resolve) => setTimeout(resolve, 1000))
	const amount = 20
	const isLegacyCode = code.endsWith('2024')

	/**
	 * @todo @fixme Consider starting with mocking so this logic
	 * lives in the test, in the mock. Your component doesn't decide
	 * which codes are valid, so testing that in its current state
	 * is leaking responsibility.
	 */
	return {
		code,
		amount: isLegacyCode ? amount / 2 : amount,
		warning: isLegacyCode
			? `"${code}" is a legacy code. Discount amount halfed.`
			: undefined,
	}
}

export function DiscountCodeForm() {
	const [state, dispatch] = useReducer(discountFormReducer, {
		submitting: false,
	})
	const [warning, setWarning] = useState<string | undefined>()

	const showWarning = (message: string) => {
		setWarning(message)
		setTimeout(() => setWarning(undefined), 5000)
	}

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault()
		setWarning(undefined)
		dispatch({ type: 'submitting' })

		const data = new FormData(event.currentTarget)
		const code = data.get('discountCode')

		if (!code) {
			dispatch({ type: 'error', error: 'Missing discount code' })
			return
		}

		if (typeof code !== 'string') {
			dispatch({
				type: 'error',
				error: `Expected discount code to be a string but got ${typeof code}`,
			})
			return
		}

		const discount = await fetchDiscount(code)
		dispatch({ type: 'success', discount })

		if (discount.warning) {
			showWarning(discount.warning)
		}
	}

	return (
		<section className="w-96 rounded-lg border bg-white p-10">
			{state.submitting ? (
				<p>
					<span className="inline-block animate-spin font-bold">{'◡'}</span>
				</p>
			) : state.discount ? (
				<p>
					Discount: <strong>{state.discount.code}</strong> (-
					{state.discount.amount}%)
				</p>
			) : state.error ? (
				<p role="alert" className="font-medium text-red-600">
					{state.error}
				</p>
			) : (
				<form onSubmit={handleSubmit} className="flex flex-col gap-5">
					<div>
						<label htmlFor="discountCode" className="mb-1 block">
							Discount code
						</label>
						<input
							id="discountCode"
							name="discountCode"
							className="w-full rounded-md border px-2 py-1 focus:ring-4"
							placeholder="ABCD1234"
							pattern="[A-Z]{4}[0-9]{4}"
							autoComplete="off"
							required
						/>
					</div>

					<button
						type="submit"
						className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-500 focus:ring-4"
					>
						Apply discount
					</button>
				</form>
			)}

			{warning ? (
				<p
					role="alert"
					className="animation-slide animate-slide-in fixed bottom-5 right-5 rounded-lg border border-yellow-800/20 bg-yellow-200 px-5 py-2.5 font-medium"
				>
					{warning}
				</p>
			) : null}
		</section>
	)
}
