import { Option } from "./option.js";
/**
 * A Rust-like Result class.
 *
 * _Note: Please use either Ok or Err to construct Results._
 *
 * @example
 * ```ts
 * function divide(left: number, right: number): Result<number, Error> {
 *   if (right === 0) return Err("Divided by zero");
 *
 *   return Ok(left / right);
 * }
 *
 * ```
 */
export declare class Result<T, E extends Error> {
    private val;
    /**
     * A constructor for a Result.
     *
     * @param {T | E} input The Result value.
     *
     * _Note: Please use either `Ok` or `Err` to construct Results._
     */
    constructor(input: T | E);
    /**
     * Converts Result into a String for display purposes.
     */
    get [Symbol.toStringTag](): string;
    /**
     * Iterator support for Result.
     *
     * _Note: This method will only yeild if the Result is Ok._
     * @returns {IterableIterator<T>}
     */
    [Symbol.iterator](): Generator<T | E, void, unknown>;
    /**
     * Returns true if contained value isnt an error.
     *
     * @returns {boolean}
     */
    isOk(): boolean;
    /**
     * Returns true if contained value is an error.
     *
     * @returns {boolean}
     */
    isErr(): boolean;
    private formatError;
    /**
     * Returns the contained Ok value, consuming the Result.
     * Throws an Error with a given message if contained value is not Ok.
     *
     * @param {string} msg An error message to throw if contained value is an Error.
     * @returns {T}
     */
    expect(msg: string): T;
    /**
     * Returns the contained Err value, consuming the Result.
     * Throws an Error with a given message if contained value is not an Err.
     *
     * @param {string} msg An error message to throw if contained value is Ok.
     * @returns {T}
     */
    expectErr(msg: string): T;
    /**
     * Returns the contained Ok value, consuming the Result.
     * Throws an Error if contained value is not Ok.
     *
     * @returns {T}
     */
    unwrap(): T;
    /**
     * Returns the contained Error value, consuming the Result.
     * Throws an Error if contained value is not an Error.
     *
     * @returns {E}
     */
    unwrapErr(): E;
    /**
     * Returns the contained Ok value or a provided default.
     *
     * @param {T} fallback A default value to return if contained value is an Error.
     * @returns {T}
     */
    unwrapOr(fallback: T): T;
    /**
     * Returns the contained Ok value or computes it from a closure.
     *
     * @param {Function} fn A function that computes a new value.
     * @returns {T}
     */
    unwrapOrElse(fn: (input: E) => T): T;
    /**
     * Maps a Result<T, E> to Result<U, E> by applying a function to a contained Ok value, leaving an Error value untouched.
     *
     * @param {Function} fn A mapping function.
     * @returns {Result<U, E>}
     */
    map<U>(fn: (input: T) => U): Result<U, E>;
    /**
     * Maps a Result<T, E> to Result<T, U> by applying a function to a contained Error value, leaving an Ok value untouched.
     *
     * @param {Function} fn A mapping function.
     * @returns {Result<T, U>}
     */
    mapErr<U extends Error>(fn: (input: E) => U): Result<T, U>;
    /**
     * Returns the provided fallback (if Error), or applies a function to the contained value.
     *
     * @param {U} fallback A defualt value
     * @param {Function} fn A mapping function.
     * @returns {U}
     */
    mapOr<U>(fallback: U, fn: (input: T) => U): U;
    /**
     * Returns `or` if the result is Error, otherwise returns self.
     *
     * @param {Result<T, E>} or An alternative Result value
     * @returns {Result<T, E>}
     */
    or(or: Result<T, E>): Result<T, E>;
    /**
     * Converts from `Result<T, E>` to `Option<T>`.
     *
     * @returns {Option<T>}
     *
     * @example
     * ```ts
     * const option = Err("Some Error").ok(); // => None()
     * ```
     */
    ok(): Option<T>;
    /**
     * Returns contained value for use in matching.
     *
     * _Note: Please only use this to match against in `if` or `swtich` statments._
     *
     * @returns {T | E}
     * @example
     * ```ts
     * function coolOrNice(input: Result<string, Error>): Result<void, Error> {
     *   switch (input.peek()) {
     *     case "cool":
     *       console.log("Input was the coolest!");
     *       break;
     *     case "nice":
     *       console.log("Input was was the nicest!");
     *       break
     *     default:
     *       return Err("Input neither cool nor nice.");
     *   }
     *   return Ok()
     * }
     * ```
     */
    peek(): T | E;
    /**
     * Throws contained Errors, consuming the Result.
     */
    throw(): void;
    /**
     * Converts from Result<Result<T, E>, E> to Result<T, E>
     * @returns Option<T>
     */
    flatten(): Result<T, E>;
    /**
     * Run a closure in a `try`/`catch` and convert it into a Result.
     *
     * _Note: Please use `fromAsync` to capture the Result of asynchronous closures._
     * @param {Function} fn The closure to run
     * @returns {Result<T, Error>} The Result of the closure
     */
    static from<T>(fn: () => T): Result<T, Error>;
    /**
     * Run an asynchronous closure in a `try`/`catch` and convert it into a Result.
     *
     * _Note: Please use `from` to capture the Result of synchronous closures._
     * @param {Function} fn The synchronous closure to run
     * @returns {Promise<Result<T, Error>>} The Result of the closure
     */
    static fromAsync<T>(fn: () => Promise<T>): Promise<Result<T, Error>>;
    /**
     * Partition an array of Results into Ok values and Errors
     *
     * @param {Array<Result<T, E>>} input An array of Results
     * @returns {{ok: Array<T>, err: Array<E>}}
     *
     * @example
     * ```ts
     * const results = [Ok(2), Ok(16), Err("Something went wrong!")]
     *
     * Result.partition(results) // { ok:[2, 16], err:[Error("Something went wrong!")]}
     *
     * ```
     */
    static partition<T, E extends Error>(input: Array<Result<T, E>>): {
        ok: Array<T>;
        err: Array<E>;
    };
}
/**
 * Return a non-error value result.
 *
 * @param {Exclude<T, E>} input a value that does not extend the `Error` type.
 * @returns {Result<T, E>}
 * @example
 * ```ts
 * function divide(left: number, right: number): Result<number, Error> {
 *   if (right === 0) return Err("Divided by zero");
 *
 *   return Ok(left / right);
 * }
 *
 * ```
 *
 * @example
 * ```ts
 * const foo = Ok("Foo!");
 *
 * if (foo instanceof Ok) {
 *  // Do something
 * }
 * ```
 */
export declare function Ok<T, E extends Error>(input?: T): Result<T, E>;
/**
 * Return a error result.
 *
 * @param {E | string} input a value that extends the `Error` type.
 * @returns {Result<T, E>}
 * @example
 * ```ts
 * function divide(left: number, right: number): Result<number, Error> {
 *   if (right === 0) return Err("Divided by zero");
 *
 *   return Ok(left / right);
 * }
 *
 * ```
 *
 * @example
 * ```ts
 * const foo = Err(new Error("Foo!"));
 *
 * if (foo instanceof Err) {
 *  // Do something
 * }
 * ```
 */
export declare function Err<T, E extends Error>(input: E | string): Result<T, E>;
