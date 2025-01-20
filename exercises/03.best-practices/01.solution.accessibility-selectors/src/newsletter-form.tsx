export function NewsletterForm() {
	return (
		<section className="w-96 rounded-lg border bg-white p-10">
			<h2 className="mb-6 border-b pb-2.5 text-2xl font-bold">Newsletter</h2>
			<form className="flex flex-col gap-5">
				<div>
					<label htmlFor="email" className="mb-1 block">
						Your email
					</label>
					<input
						id="email"
						name="email"
						type="email"
						className="w-full rounded-md border px-2 py-1 focus:ring-4"
						placeholder="kody@epicweb.dev"
						autoComplete="off"
						required
					/>
				</div>

				<button
					type="submit"
					className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-500 focus:ring-4"
				>
					Join the 📨 newsletter
				</button>
			</form>
		</section>
	)
}
