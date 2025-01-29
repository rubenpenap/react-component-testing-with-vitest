import { useState } from 'react'
import { FilePreview } from './file-preview.jsx'

export function App() {
	const [file, setFile] = useState<File>()

	return (
		<div>
			{file ? (
				<div className="flex flex-col items-center">
					<FilePreview file={file} />
					<button
						className="mt-10 rounded-full bg-slate-800 px-6 py-2 text-sm font-bold text-white hover:bg-slate-600"
						onClick={() => setFile(undefined)}
					>
						Preview another file
					</button>
				</div>
			) : (
				<div className="rounded-md border border-slate-200 bg-white p-4 shadow-lg shadow-slate-200">
					<input
						type="file"
						name="file"
						required
						className="text-sm font-medium"
						onChange={(event) => {
							const [selectedFile] = event.currentTarget.files || []

							if (selectedFile) {
								setFile(selectedFile)
							}
						}}
					/>
				</div>
			)}
		</div>
	)
}
