import { useEffect, useState } from 'react'

const decoder = new TextDecoder()

export function FilePreview({ file }: { file: File }) {
	const [previewText, setPreviewText] = useState<string>()

	useEffect(() => {
		const getFilePreview = async () => {
			const buffer = await file.arrayBuffer()
			const previewText = decoder.decode(buffer)
			setPreviewText(previewText)
		}
		getFilePreview()
	}, [file])

	return (
		<div>
			<div className="w-full max-w-2xl overflow-hidden rounded-md border border-slate-200 bg-white shadow-lg shadow-slate-200">
				<p className="border-b border-slate-200 bg-slate-50 px-4 py-2 font-bold text-slate-600">
					📄 {file.name}
				</p>
				<pre className="max-h-[28ch] overflow-scroll p-4">{previewText}</pre>
			</div>
		</div>
	)
}
