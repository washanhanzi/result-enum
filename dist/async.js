import { Ok, Err } from './result.js';
export async function async(fn) {
    try {
        const data = await fn;
        return Ok(data);
    }
    catch (error) {
        return Err(error);
    }
}
