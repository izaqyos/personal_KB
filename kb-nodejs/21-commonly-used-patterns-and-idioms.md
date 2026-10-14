---
type: reference
title: commonly used patterns and idioms
description: Commonly used Node.js idioms such as JSON.stringify with indentation.
tags: [nodejs, javascript, json, one-liners, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "nodejs-kb#21"
---

# commonly used patterns and idioms

[↑ nodejs-kb](/kb-nodejs/README.md)

## 21.1 JSON.stringify

```text
Most used by me, stringify with 4 spaces indent to right:
        console.log(`Got json ${JSON.stringify(jsonData, null, 4)} from ${url}`);

1 space:
        console.log(`Got json ${JSON.stringify(jsonData, null, ' ')} from ${url}`);
1 tab:
        console.log(`Got json ${JSON.stringify(jsonData, null, "\t")} from ${url}`);


https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify

examples:
JSON.stringify({}); // '{}'
JSON.stringify(true); // 'true'
JSON.stringify("foo"); // '"foo"'
JSON.stringify([1, "false", false]); // '[1,"false",false]'
JSON.stringify([NaN, null, Infinity]); // '[null,null,null]'
JSON.stringify({ x: 5 }); // '{"x":5}'

JSON.stringify(new Date(1906, 0, 2, 15, 4, 5));
// '"1906-01-02T15:04:05.000Z"'

JSON.stringify({ x: 5, y: 6 });
// '{"x":5,"y":6}'
JSON.stringify([new Number(3), new String("false"), new Boolean(false)]);
// '[3,"false",false]'

// String-keyed array elements are not enumerable and make no sense in JSON
const a = ["foo", "bar"];
a["baz"] = "quux"; // a: [ 0: 'foo', 1: 'bar', baz: 'quux' ]
JSON.stringify(a);
// '["foo","bar"]'

JSON.stringify({ x: [10, undefined, function () {}, Symbol("")] });
// '{"x":[10,null,null,null]}'

// Standard data structures
JSON.stringify([
  new Set([1]),
  new Map([[1, 2]]),
  new WeakSet([{ a: 1 }]),
  new WeakMap([[{ a: 1 }, 2]]),
]);
// '[{},{},{},{}]'

// TypedArray
JSON.stringify([new Int8Array([1]), new Int16Array([1]), new Int32Array([1])]);
// '[{"0":1},{"0":1},{"0":1}]'
JSON.stringify([
  new Uint8Array([1]),
  new Uint8ClampedArray([1]),
  new Uint16Array([1]),
  new Uint32Array([1]),
]);
// '[{"0":1},{"0":1},{"0":1},{"0":1}]'
JSON.stringify([new Float32Array([1]), new Float64Array([1])]);
// '[{"0":1},{"0":1}]'

// toJSON()
JSON.stringify({
  x: 5,
  y: 6,
  toJSON() {
    return this.x + this.y;
  },
});
// '11'

// Symbols:
JSON.stringify({ x: undefined, y: Object, z: Symbol("") });
// '{}'
JSON.stringify({ [Symbol("foo")]: "foo" });
// '{}'
JSON.stringify({ [Symbol.for("foo")]: "foo" }, [Symbol.for("foo")]);
// '{}'
JSON.stringify({ [Symbol.for("foo")]: "foo" }, (k, v) => {
  if (typeof k === "symbol") {
    return "a symbol";
  }
});
// undefined

// Non-enumerable properties:
JSON.stringify(
  Object.create(null, {
    x: { value: "x", enumerable: false },
    y: { value: "y", enumerable: true },
  }),
);
// '{"y":"y"}'

// BigInt values throw
JSON.stringify({ x: 2n });
// TypeError: BigInt value can't be serialized in JSON

    21.2
```
