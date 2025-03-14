import { test as testBase } from 'vitest'
import { worker } from './src/mocks/browser'

type TestContext = {
	worker: typeof worker
}

export const test = testBase.extend<TestContext>({
	worker: [
		async ({}, use) => {
			await worker.start({
				quiet: true,
				onUnhandledRequest: 'error',
			})
			await use(worker)
			worker.resetHandlers()
			worker.stop()
		},
		{ auto: true },
	],
})
