# result-enum

Copy from `https://github.com/OliverBrotchie/optionals`

```ts
import { async } from '@washanhanzi/result-enum'

const results = await async(asyncFn)
if (result.isErr()){
	throw result.unwrapErr()
}
result.unwrap()
```
