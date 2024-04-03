# result-enum

Copy from `https://github.com/OliverBrotchie/optionals`

This package contain ts code only.

```ts
const results = await async(asyncFn)
if (result.isErr()){
	throw result.unwrapErr()
}
result.unwrap()
```