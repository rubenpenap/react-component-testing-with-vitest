export async function readFile(file: File): Promise<string> {
	return file.text()
}
