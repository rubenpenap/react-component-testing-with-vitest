import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './app.jsx'

async function enableMocking() {
	if (process.env.NODE_ENV === 'development') {
		const { worker } = await import('./mocks/browser.js')

		await worker.start({
			onUnhandledRequest: 'warn',
		})
	}
}

enableMocking().then(() => {
	createRoot(document.getElementById('root')!).render(
		<StrictMode>
			<App />
		</StrictMode>,
	)
})
