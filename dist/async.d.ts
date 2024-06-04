import { Result } from './result.js';
export declare function async<T, E extends Error>(fn: Promise<T>): Promise<Result<T, E>>;
