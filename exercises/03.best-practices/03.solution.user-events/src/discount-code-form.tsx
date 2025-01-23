import { useReducer, useState, type FormEventHandler } from 'react'

export interface DiscountCodeRequest {
	code: string
	country: string
}

export interface Discount {
	code: string
	amount: number
	isLegacy?: true
}

type DiscountCodeError = {
	errorCode: 'UNSUPPORTED_COUNTRY'
	code: string
	country: string
}

export type DiscountCodeResponse = Discount | DiscountCodeError

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

type NotificationType = 'warning' | 'error'
interface Notification {
	type: NotificationType
	text: string
}

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

async function fetchDiscount(input: {
	code: string
	country: string
}): Promise<Discount> {
	const { code, country } = input

	const response = await fetch('https://api.example.com/discount/code', {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify({
			code,
			country,
		} satisfies DiscountCodeRequest),
	})
	const data = (await response.json()) as DiscountCodeResponse

	if ('errorCode' in data) {
		throw data
	}

	return data
}

export function DiscountCodeForm() {
	const [state, dispatch] = useReducer(discountFormReducer, {
		submitting: false,
	})
	const [notification, setNotification] = useState<Notification>()

	const notify = (text: string, type: 'warning' | 'error' = 'warning') => {
		setNotification({ text, type })
		setTimeout(() => setNotification(undefined), 5000)
	}

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault()
		setNotification(undefined)
		dispatch({ type: 'submitting' })

		const data = new FormData(event.currentTarget)
		const code = data.get('discountCode')
		const country = data.get('country')

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

		if (!country) {
			dispatch({ type: 'error', error: 'Missing country code' })
			return
		}
		if (typeof country !== 'string') {
			dispatch({
				type: 'error',
				error: `Expected discount country to be a string but got ${typeof country}`,
			})
			return
		}

		fetchDiscount({ code, country })
			.then((discount) => {
				dispatch({ type: 'success', discount })
				if (discount.isLegacy) {
					notify(`"${code}" is a legacy code. Discount amount halfed.`)
				}
			})
			.catch((error: DiscountCodeError | Error) => {
				if ('errorCode' in error && error.errorCode === 'UNSUPPORTED_COUNTRY') {
					dispatch({ type: 'idle' })
					notify(
						`"${error.code}" is not available in your country (${error.country})`,
						'error',
					)
					return
				}

				dispatch({ type: 'error', error: 'Failed to apply the discount code' })
			})
	}

	return (
		<section className="w-96 rounded-lg border bg-white p-10">
			{state.submitting ? (
				<p aria-hidden>
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

					<div>
						<label htmlFor="country" className="mb-1 block">
							Country
						</label>
						<select
							id="country"
							name="country"
							className="w-full rounded-md border px-2 py-1 focus:ring-4"
							required
						>
							<option value="USA">United States</option>
							<option value="CAN">Canada</option>
							<option value="MEX">Mexico</option>
						</select>
					</div>

					<button
						type="submit"
						className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-500 focus:ring-4"
					>
						Apply discount
					</button>
				</form>
			)}

			{notification ? (
				<p
					role="alert"
					className={`animation-slide animate-slide-in fixed bottom-5 right-5 rounded-lg border px-5 py-2.5 font-medium ${notification.type === 'error' ? 'border-red-800/20 bg-red-200' : 'border-yellow-800/20 bg-yellow-200'}`}
				>
					{notification.text}
				</p>
			) : null}
		</section>
	)
}
