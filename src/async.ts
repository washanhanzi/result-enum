import { Result, Ok, Err } from './result.js'

export async function async<T, E extends Error>(fn: Promise<T>): Promise<Result<T, E>> {
	try {
		const data: T = await fn
		return Ok(data)
	} catch (error) {
		return Err(error as E)
	}
}
