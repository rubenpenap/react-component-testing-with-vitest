import { test as testBase } from 'vitest'
import { worker } from './src/mocks/browser.js'

interface TestContext {
	worker: typeof worker
}

export const test = testBase.extend<TestContext>({
	worker: [
		async ({}, use) => {
			await worker.start({
				quiet: true,
				onUnhandledRequest(request, print) {
					if (/(\.woff2?)$/.test(request.url)) {
						return
					}

					print.error()
				},
			})
			await use(worker)
			worker.stop()
		},
		{ auto: true },
	],
})
