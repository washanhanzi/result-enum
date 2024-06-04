import { Result } from "./result.js";
/**
 * The primitive None value.
 *
 * _Note: To construct a None variant Option, please use `None()` instead._
 */
export declare const none: unique symbol;
/**
 * A Rust-like Option class.
 *
 * _Note: Please use either `Some` or `None` to construct an Option._
 *
 * @example
 * ```
 * function divide(left: number, right: number): Option<number> {
 *   if (right === 0) return None();
 *
 *   return Some(left / right);
 * }
 *
 * ```
 */
export declare class Option<T> {
    private val;
    /**
     * A constructor for an Option.
     *
     * _Note: Please use either `Some` or `None` to construct Options._
     *
     * @param {T | typeof none} input The value to wrap in an Option.
     */
    constructor(input: T | typeof none);
    /**
     * Converts Option into a String for display purposes.
     */
    get [Symbol.toStringTag](): string;
    /**
     * Iterator support for Option.
     *
     * _Note: This method will only yeild if the Option is Some._
     * @returns {IterableIterator<T>}
     */
    [Symbol.iterator](): Generator<typeof none | T, void, unknown>;
    /**
     * Returns true if contained value isnt None.
     * @returns {boolean}
     */
    isSome(): boolean;
    /**
     * Returns true if contained value is None.
     *
     * @returns {boolean}
     */
    isNone(): boolean;
    /**
     * Returns the contained Some value, consuming the Option.
     * Throws an Error with a given message if the contained value is None.
     *
     * @param {string} msg An error message to throw if contained value is None.
     * @returns {T}
     */
    expect(msg: string): T;
    /**
     * Returns the contained Some value, consuming the Option.
     * Throws an Error if contained value is None.
     *
     * @returns {T}
     */
    unwrap(): T;
    /**
     * Returns the contained Some value or a provided default.
     *
     * @param {T} fallback A default value to return if contained value is an Option.
     * @returns {T}
     */
    unwrapOr(fallback: T): T;
    /**
     * Returns the contained Some value or computes it from a closure.
     *
     * @param {Function} fn A function that computes a new value.
     * @returns {T}
     */
    unwrapOrElse(fn: () => T): T;
    /**
     * Maps an Option<T> to Option<U> by applying a function to a contained Some value, leaving None values untouched.
     *
     * @param {Function} fn A mapping function.
     * @returns {Option<U>}
     */
    map<U>(fn: (input: T) => U): Option<U>;
    /**
     * Returns the provided fallback (if None), or applies a function to the contained value.
     *
     * @param {U} fallback A defualt value
     * @param {Function} fn A mapping function.
     * @returns {U}
     */
    mapOr<U>(fallback: U, fn: (input: T) => U): U;
    /**
     * Returns `or` if the Option is None, otherwise returns self.
     *
     * @param {Option<T>} or An alternative Option value
     * @returns {Option<T>}
     */
    or(or: Option<T>): Option<T>;
    /**
     * Transforms the `Option<T>` into a `Result<T, E>`, mapping Some to Ok and None to Err.
     *
     * @param {E} err An error to return if the Option is None.
     * @returns {Result<T, E>}
     *
     * @example
     * ```
     * const result = Some(2).okOr("Error"); // => Ok(2)
     * ```
     */
    okOr<E extends Error>(err: E | string): Result<T, E>;
    /**
     * Returns contained value for use in matching.
     *
     * _Note: Please only use this to match against in `if` or `swtich` statments._
     *
     * @returns {T | typeof none}
     * @example
     * ```ts
     * function coolOrNice(input: Option<string>): Option<void> {
     *   switch (input.peek()) {
     *     case "cool":
     *       console.log("Input was the coolest!");
     *       break;
     *     case "nice":
     *       console.log("Input was was the nicest!");
     *       break
     *     default:
     *       return None();
     *   }
     *   return Some()
     * }
     * ```
     */
    peek(): T | typeof none;
    /**
     * Converts from Option<Option<T> to Option<T>
     * @returns Option<T>
     */
    flatten(): Option<T>;
    /**
     * Run a closure and convert it into an Option.
     * If the function returns `null` or `undefined`, an Option containing None will be reutrned.
     *
     * _Note: Please use `fromAsync` to capture the result of asynchronous closures._
     * @param {Function} fn The closure to run.
     * @returns {Option<T>} The result of the closure.
     */
    static from<T>(fn: () => T | null | undefined): Option<T>;
    /**
     * Run an asynchronous closure and convert it into an Option.
     * If the function returns `null` or `undefined`, an Option containing None will be reutrned.
     *
     * _Note: Please use `from` to capture the result of synchronous closures._
     * @param {Function} fn The closure to run.
     * @returns {Promise<Option<T>>} The result of the closure.
     */
    static fromAsync<T>(fn: () => Promise<T | null | undefined>): Promise<Option<T>>;
}
/**
 * Construct an Option from a value other than None.
 *
 * @param {Exclude<T, typeof none>} input a value that isnt None.
 * @returns {Option<T>}
 * @example
 * ```ts
 * function divide(left: number, right: number): Option<number> {
 *   if (right === 0) return None();
 *
 *   return Some(left / right);
 * }
 *
 * ```
 *
 * @example
 * ```ts
 * const foo = Some("Value");
 *
 * if (foo instanceof Some) {
 *  // Do something
 * }
 * ```
 */
export declare function Some<T>(input: T): Option<T>;
/**
 * Construct the None variant of Option.
 *
 * @returns {Option<T>}
 * @example
 * ```ts
 *  function divide(left: number, right: number): Option<number> {
 *   if (right === 0) return None();
 *
 *   return Some(left / right);
 * }
 * ```
 * @example
 * ```ts
 * const foo = None();
 *
 * if (foo instanceof None) {
 *  // Do something
 * }
 * ```
 */
export declare function None<T>(): Option<T>;
