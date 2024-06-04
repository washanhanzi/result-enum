// deno-lint-ignore-file no-prototype-builtins
/* eslint-disable no-prototype-builtins */
import { None, Some } from "./option.js";
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
export class Result {
    val;
    /**
     * A constructor for a Result.
     *
     * @param {T | E} input The Result value.
     *
     * _Note: Please use either `Ok` or `Err` to construct Results._
     */
    constructor(input) {
        this.val = input;
    }
    /**
     * Converts Result into a String for display purposes.
     */
    get [Symbol.toStringTag]() {
        return `Result`;
    }
    /**
     * Iterator support for Result.
     *
     * _Note: This method will only yeild if the Result is Ok._
     * @returns {IterableIterator<T>}
     */
    *[Symbol.iterator]() {
        if (this.isOk())
            yield this.val;
    }
    /**
     * Returns true if contained value isnt an error.
     *
     * @returns {boolean}
     */
    isOk() {
        return !(this.val instanceof Error ||
            (this.val &&
                typeof this.val === "object" &&
                Error.isPrototypeOf(this.val)));
    }
    /**
     * Returns true if contained value is an error.
     *
     * @returns {boolean}
     */
    isErr() {
        return (this.val instanceof Error ||
            (this.val &&
                typeof this.val === "object" &&
                Error.isPrototypeOf(this.val)));
    }
    formatError(err) {
        err.stack = `${err.message}: ${this.val.stack
            ? "\n\t" + this.val.stack.split("\n").join("\n\t")
            : this.val.message}`;
        throw err;
    }
    /**
     * Returns the contained Ok value, consuming the Result.
     * Throws an Error with a given message if contained value is not Ok.
     *
     * @param {string} msg An error message to throw if contained value is an Error.
     * @returns {T}
     */
    expect(msg) {
        if (this.isErr()) {
            this.formatError(new Error(msg));
        }
        return this.val;
    }
    /**
     * Returns the contained Err value, consuming the Result.
     * Throws an Error with a given message if contained value is not an Err.
     *
     * @param {string} msg An error message to throw if contained value is Ok.
     * @returns {T}
     */
    expectErr(msg) {
        if (this.isOk()) {
            this.formatError(new Error(msg));
        }
        return this.val;
    }
    /**
     * Returns the contained Ok value, consuming the Result.
     * Throws an Error if contained value is not Ok.
     *
     * @returns {T}
     */
    unwrap() {
        if (this.isErr()) {
            this.formatError(new Error(`Unwrap called on ${this.val.name}`));
        }
        return this.val;
    }
    /**
     * Returns the contained Error value, consuming the Result.
     * Throws an Error if contained value is not an Error.
     *
     * @returns {E}
     */
    unwrapErr() {
        if (this.isOk()) {
            throw new Error(`UnwrapError called on value - ${this.val}`);
        }
        return this.val;
    }
    /**
     * Returns the contained Ok value or a provided default.
     *
     * @param {T} fallback A default value to return if contained value is an Error.
     * @returns {T}
     */
    unwrapOr(fallback) {
        if (this.isErr()) {
            return fallback;
        }
        return this.val;
    }
    /**
     * Returns the contained Ok value or computes it from a closure.
     *
     * @param {Function} fn A function that computes a new value.
     * @returns {T}
     */
    unwrapOrElse(fn) {
        if (this.isErr()) {
            return fn(this.val);
        }
        return this.val;
    }
    /**
     * Maps a Result<T, E> to Result<U, E> by applying a function to a contained Ok value, leaving an Error value untouched.
     *
     * @param {Function} fn A mapping function.
     * @returns {Result<U, E>}
     */
    map(fn) {
        if (this.isOk()) {
            return new Result(fn(this.val));
        }
        return this;
    }
    /**
     * Maps a Result<T, E> to Result<T, U> by applying a function to a contained Error value, leaving an Ok value untouched.
     *
     * @param {Function} fn A mapping function.
     * @returns {Result<T, U>}
     */
    mapErr(fn) {
        if (this.isOk()) {
            return this;
        }
        return new Result(fn(this.val));
    }
    /**
     * Returns the provided fallback (if Error), or applies a function to the contained value.
     *
     * @param {U} fallback A defualt value
     * @param {Function} fn A mapping function.
     * @returns {U}
     */
    mapOr(fallback, fn) {
        if (this.isOk()) {
            return fn(this.val);
        }
        return fallback;
    }
    /**
     * Returns `or` if the result is Error, otherwise returns self.
     *
     * @param {Result<T, E>} or An alternative Result value
     * @returns {Result<T, E>}
     */
    or(or) {
        if (this.isOk()) {
            return this;
        }
        return or;
    }
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
    ok() {
        if (this.isOk()) {
            return Some(this.val);
        }
        return None();
    }
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
    peek() {
        return this.val;
    }
    /**
     * Throws contained Errors, consuming the Result.
     */
    throw() {
        if (this.isErr()) {
            throw this.val;
        }
    }
    /**
     * Converts from Result<Result<T, E>, E> to Result<T, E>
     * @returns Option<T>
     */
    flatten() {
        if (this.val instanceof Result) {
            return this.val;
        }
        return this;
    }
    /**
     * Run a closure in a `try`/`catch` and convert it into a Result.
     *
     * _Note: Please use `fromAsync` to capture the Result of asynchronous closures._
     * @param {Function} fn The closure to run
     * @returns {Result<T, Error>} The Result of the closure
     */
    static from(fn) {
        try {
            return new Result(fn());
        }
        catch (e) {
            return new Result(e);
        }
    }
    /**
     * Run an asynchronous closure in a `try`/`catch` and convert it into a Result.
     *
     * _Note: Please use `from` to capture the Result of synchronous closures._
     * @param {Function} fn The synchronous closure to run
     * @returns {Promise<Result<T, Error>>} The Result of the closure
     */
    static async fromAsync(fn) {
        try {
            return new Result(await fn());
        }
        catch (e) {
            return new Result(e);
        }
    }
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
    static partition(input) {
        return input.reduce((acc, e) => {
            if (e.isOk())
                acc.ok.push(e.unwrap());
            else
                acc.err.push(e.unwrapErr());
            return acc;
        }, {
            ok: [],
            err: [],
        });
    }
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
export function Ok(input) {
    return new Result(input);
}
Object.defineProperty(Ok, Symbol.hasInstance, {
    value: (instance) => {
        if (typeof instance !== "object")
            return false;
        return instance?.isOk() || false;
    },
});
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
export function Err(input) {
    if (typeof input === "string") {
        return new Result(new Error(input));
    }
    return new Result(input);
}
Object.defineProperty(Err, Symbol.hasInstance, {
    value: (instance) => {
        if (typeof instance !== "object")
            return false;
        return instance?.isErr() || false;
    },
});
