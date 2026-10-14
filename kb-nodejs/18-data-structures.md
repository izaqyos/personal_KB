---
type: reference
title: Data structures
description: JavaScript data structures such as Map and its properties and methods.
tags: [javascript, data-structures, nodejs, reference, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "nodejs-kb#18"
---

# Data structures

[↑ nodejs-kb](/kb-nodejs/README.md)

## 18.1 Map

```text
nodejs map data structure 
https://flaviocopes.com/javascript-data-structures-map/
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/forEach 
```

### 18.1.1 introduction

```text
A Map data structure allows to associate data to a key.
Before ES6
ECMAScript 6 (also called ES2015) introduced the Map data structure to the JavaScriptworld, along with Set
Before its introduction, people generally used objects as maps, by associating some object or value to a specific key value:
const car = {}
car['color'] = 'red'
car.owner = 'Flavio'
console.log(car['color']) //red
console.log(car.color) //red
console.log(car.owner) //Flavio
console.log(car['owner']) //Flavio

object has some corner cases and shortcomings that proper map data-structure addresses 

map basics:
$ node
Welcome to Node.js v18.3.0.
Type ".help" for more information.
> const myMap = new Map();
> myMap
Map(0) {}
> myMap.set(1, "1");
Map(1) { 1 => '1' }
> myMap.set(2, "2");
Map(2) { 1 => '1', 2 => '2' }
> myMap.has(2)
true
> myMap.size
2
> for (const k of myMap.keys()) {console.log(`${k}`);}
1
2
> for (const [k,v] of myMap) {console.log(`${k}=${v}`);
... }
1=1
2=2
undefined
> const keys1 = [...myMap.keys()]
> keys1
[ 1, 2 ]
> const valuess1 = [...myMap.values()]
> valuess1
[ '1', '2' ]

> const initializedMap = [['a', 97], ['b', 98], ['c', 99]]; //actually an array
> initializedMap
[ [ 'a', 97 ], [ 'b', 98 ], [ 'c', 99 ] ]
> function printMapElem(v,k,m){console.log(`m[${k}] = m[${v}]`);}
> initializedMap.forEach(printMapElem)
m[0] = m[a,97]
m[1] = m[b,98]
m[2] = m[c,99]
undefined
> const initializedMapForRealJJJ = new Map([['a', 97], ['b', 98], ['c', 99]]);
> initializedMapForRealJJJ.forEach(printMapElem)
m[a] = m[97]
m[b] = m[98]
m[c] = m[99]
> initializedMap.at('a')
[ 'a', 97 ]
```

### 18.1.2 Map properties

```text
Description
The species accessor property returns the default constructor for Map objects. Subclass constructors may over-ride it to change the constructor assignment.

Examples
Species in ordinary objects
The species property returns the default constructor function, which is the Map constructor for Map objects:
```

### 18.1.3 Map.prototype[@@toStringTag]

```text
> console.log(initializedMapForRealJJJ)
Map(3) { 'a' => 97, 'b' => 98, 'c' => 99 }
undefined
> Object.prototype.toString.call(initializedMapForRealJJJ)
'[object Map]'
```

### 18.1.4 Map.prototype[@@iterator]()

```text
> const iter = initializedMapForRealJJJ[Symbol.iterator]();
undefined
> for (const i of iter){console.log(i)}
[ 'a', 97 ]
[ 'b', 98 ]
[ 'c', 99 ]
```

### 18.1.5 Map.prototype.clear()

```text
clears map 
> myMap.clear()
> myMap
Map(0) {}
```

### 18.1.6 Map.prototype.delete()

```text
The delete() method removes the specified element from a Map object by key.
> initializedMapForRealJJJ.delete('b')
true
> initializedMapForRealJJJ
Map(2) { 'a' => 97, 'c' => 99 }

    18.2
```
