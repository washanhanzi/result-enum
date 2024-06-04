import { Result } from './result';
export declare function async<T, E extends Error>(fn: Promise<T>): Promise<Result<T, E>>;
