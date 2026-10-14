---
type: reference
title: NodeJS tips and tricks
description: Section 15 of the legacy nodejs-kb notes.
tags: [kb-nodejs, nodejs, python]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "nodejs-kb#15"
---

# NodeJS tips and tricks

[↑ nodejs-kb](/kb-nodejs/README.md)

## 15.1 python like idioms, tags: nodejs, python

### 15.1.1 python like range

```text
https://stackoverflow.com/questions/8273047/javascript-function-similar-to-python-range
function* range(start, stop, step = 1) {
    if (stop == null) {
        // one param defined
        stop = start;
        start = 0;
    }

    for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
        yield i;
    }
}
To use it in a for loop you need the ES6/JS1.7 for-of loop:

for (let i of range(5)) {
    console.log(i);
}
// Outputs => 0 1 2 3 4

for (let i of range(0, 10, 2)) {
    console.log(i);
}
// Outputs => 0 2 4 6 8

for (let i of range(10, 0, -2)) {
    console.log(i);
}
// Outputs => 10 8 6 4 2
```

### 15.1.2 python like list comprehension

```text
https://stackoverflow.com/questions/21372524/python-list-comprehensions-nodejs-javascript/21372656#21372656
List comprehensions put into a language's syntax what would normally be done with map and filter.

So given a Python list comprehension, you can also use map and filter:

# Python - preferred way
squares_of_odds = [x * x for x in a if x % 2 == 1]

# Python - alternate way
map(lambda x: x * x, filter(lambda x: x % 2 == 1, a))
although comprehensions are preferred in Python. JavaScript has map and filter so you can use those now.

// JavaScript - doesn't support real list comprehension
a.map(function(x){return x*x}).filter(function(x){return x%2 == 1})
```

### 15.1.3 JSON.stringfy

#### 15.1.3.1 my JSON.stringify demo

```text
code: $ cat !$ | pbcopy
cat jsonStringify.js | pbcopy
// documentation: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
//
//

console.log('Trivial usage examples');
console.log(JSON.stringify({ x: 5, y: 6 }));
// Expected output: "{"x":5,"y":6}"

console.log(JSON.stringify([new Number(3), new String('false'), new Boolean(false)]));
// Expected output: "[3,"false",false]"

console.log(JSON.stringify({ x: [10, undefined, function(){}, Symbol('')] }));
// Expected output: "{"x":[10,null,null,null]}"

console.log(JSON.stringify(new Date(2006, 0, 2, 15, 4, 5)));
// Expected output: ""2006-01-02T15:04:05.000Z""
//

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

console.log('Note Set/Map etc content is not stringifed, use a custom replacer for this..');
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

console.log('Symbols are not printed..');
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

// // BigInt values throw
// JSON.stringify({ x: 2n });
// // throw 
// // TypeError: BigInt value can't be serialized in JSON

console.log('simple replacer. dont print strings');
function replacer(key, value) {
  // Filtering out properties
  if (typeof value === "string") {
    return undefined;
  }
  return value;
}

const foo = {
  foundation: "Mozilla",
  model: "box",
  week: 45,
  transport: "car",
  month: 7,
};
console.log(JSON.stringify(foo, replacer));

console.log('whitelist array replacer');
const foo1 = {
  foundation: "Mozilla",
  model: "box",
  week: 45,
  transport: "car",
  month: 7,
};

console.log(JSON.stringify(foo1, ["week", "month"]));

console.log('exclude some subproperties');
const nestedObj = {
    level1_str: 'a level 1 string',
    level1_obj: {
        level2_str: ' a level 2 string',
        level2_obj: {
            level3_printme: 'should be printed',
            level3_password: 'should not be printed',
            level3_certificate:  'should not be printed'
        }
    }
};
console.log('Print all without replacer', JSON.stringify(nestedObj, null, 4));
function myreplacer(key, val) {
    const blackListKeys = ['level3_password', 'level3_certificate']
    if (key === 'level1_str') {
        return 'replacer intercepted key level1_str';
    }
    if (key === 'level3_printme') {
        return 'replacer intercepted key level3_printme';
    }
    if (blackListKeys.includes(key)) {
        return '********';
    }
    return val;
}
console.log('Print with replacer', JSON.stringify(nestedObj, myreplacer, 4));
// '{"week":45,"month":7}', only keep "week" and "month" properties

// '{"week":45,"month":7}'
/*
 Syntax
JSON.stringify(value)
JSON.stringify(value, replacer)
JSON.stringify(value, replacer, space)
Copy to Clipboard
Parameters
value
The value to convert to a JSON string.

replacer Optional
A function that alters the behavior of the stringification process, or an array of strings and numbers that specifies properties of value to be included in the output. If replacer is an array, all elements in this array that are not strings or numbers (either primitives or wrapper objects), including Symbol values, are completely ignored. If replacer is anything other than a function or an array (e.g. null or not provided), all string-keyed properties of the object are included in the resulting JSON string.

space Optional
A string or number that's used to insert white space (including indentation, line break characters, etc.) into the output JSON string for readability purposes.

If this is a number, it indicates the number of space characters to be used as indentation, clamped to 10 (that is, any number greater than 10 is treated as if it were 10). Values less than 1 indicate that no space should be used.

If this is a string, the string (or the first 10 characters of the string, if it's longer than that) is inserted before every nested object or array.

If space is anything other than a string or number (can be either a primitive or a wrapper object) — for example, is null or not provided — no white space is used.

Return value
A JSON string representing the given value, or undefined.
 Exceptions
TypeError
Thrown if one of the following is true:

value contains a circular reference.
A BigInt value is encountered.*

JSON.stringify() converts a value to the JSON notation that the value represents. Values are stringified in the following manner:

Boolean, Number, String, and BigInt (obtainable via Object()) objects are converted to the corresponding primitive values during stringification, in accordance with the traditional conversion semantics. Symbol objects (obtainable via Object()) are treated as plain objects.
Attempting to serialize BigInt values will throw. However, if the BigInt has a toJSON() method (through monkey patching: BigInt.prototype.toJSON = ...), that method can provide the serialization result. This constraint ensures that a proper serialization (and, very likely, its accompanying deserialization) behavior is always explicitly provided by the user.
undefined, Function, and Symbol values are not valid JSON values. If any such values are encountered during conversion, they are either omitted (when found in an object) or changed to null (when found in an array). JSON.stringify() can return undefined when passing in "pure" values like JSON.stringify(() => {}) or JSON.stringify(undefined).
The numbers Infinity and NaN, as well as the value null, are all considered null. (But unlike the values in the previous point, they would never be omitted.)
Arrays are serialized as arrays (enclosed by square brackets). Only array indices between 0 and length - 1 (inclusive) are serialized; other properties are ignored.
For other objects:
All Symbol-keyed properties will be completely ignored, even when using the replacer parameter.
If the value has a toJSON() method, it's responsible to define what data will be serialized. Instead of the object being serialized, the value returned by the toJSON() method when called will be serialized. JSON.stringify() calls toJSON with one parameter, the key, which has the same semantic as the key parameter of the replacer function:
if this object is a property value, the property name
if it is in an array, the index in the array, as a string
if JSON.stringify() was directly called on this object, an empty string
Date objects implement the toJSON() method which returns a string (the same as date.toISOString()). Thus, they will be stringified as strings.
Only enumerable own properties are visited. This means Map, Set, etc. will become "{}". You can use the replacer parameter to serialize them to something more useful. Properties are visited using the same algorithm as Object.keys(), which has a well-defined order and is stable across implementations. For example, JSON.stringify on the same object will always produce the same string, and JSON.parse(JSON.stringify(obj)) would produce an object with the same key ordering as the original (assuming the object is completely JSON-serializable).
 *
 *
 The replacer parameter
The replacer parameter can be either a function or an array.

As an array, its elements indicate the names of the properties in the object that should be included in the resulting JSON string. Only string and number values are taken into account; symbol keys are ignored.

As a function, it takes two parameters: the key and the value being stringified. The object in which the key was found is provided as the replacer's this context.

The replacer function is called for the initial object being stringified as well, in which case the key is an empty string (""). It is then called for each property on the object or array being stringified. Array indices will be provided in its string form as key. The current property value will be replaced with the replacer's return value for stringification. This means:

If you return a number, string, boolean, or null, that value is directly serialized and used as the property's value. (Returning a BigInt will throw as well.)
If you return a Function, Symbol, or undefined, the property is not included in the output.
If you return any other object, the object is recursively stringified, calling the replacer function on each property.
Note: When parsing JSON generated with replacer functions, you would likely want to use the reviver parameter to perform the reverse operation.

Typically, array elements' index would never shift (even when the element is an invalid value like a function, it will become null instead of omitted). Using the replacer function allows you to control the order of the array elements by returning a different array.
 *
The space parameter
The space parameter may be used to control spacing in the final string.

If it is a number, successive levels in the stringification will each be indented by this many space characters.
If it is a string, successive levels will be indented by this string.
Each level of indentation will never be longer than 10. Number values of space are clamped to 10, and string values are truncated to 10 characters. 

Note: if a replacer is used for serialization, then a revive method is required in JSON.parse() to reverse the replacer changes back.
see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse#using_the_reviver_parameter
 */

Run:
$ node jsonStringify.js 
Trivial usage examples
{"x":5,"y":6}
[3,"false",false]
{"x":[10,null,null,null]}
"2006-01-02T13:04:05.000Z"
Note Set/Map etc content is not stringifed, use a custom replacer for this..
Symbols are not printed..
simple replacer. dont print strings
{"week":45,"month":7}
whitelist array replacer
{"week":45,"month":7}
exclude some subproperties
Print all without replacer {
    "level1_str": "a level 1 string",
    "level1_obj": {
        "level2_str": " a level 2 string",
        "level2_obj": {
            "level3_printme": "should be printed",
            "level3_password": "should not be printed",
            "level3_certificate": "should not be printed"
        }
    }
}
Print with replacer {
    "level1_str": "replacer intercepted key level1_str",
    "level1_obj": {
        "level2_str": " a level 2 string",
        "level2_obj": {
            "level3_printme": "replacer intercepted key level3_printme",
            "level3_password": "********",
            "level3_certificate": "********"
        }
    }
}

            15.1.3.2

        15.1.4
    15.2
```
