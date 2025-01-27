import { setupWorker } from 'msw/browser'
import { handlers } from './handlers.js'

export const worker = setupWorker(...handlers)

export async function startWorker() {
	await worker.start({
		quiet: true,
		onUnhandledRequest(request, print) {
			if (/(\.(css|tsx?|woff2?))/.test(request.url)) {
				return
			}

			print.error()
		},
	})
}
