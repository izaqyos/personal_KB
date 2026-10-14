---
type: reference
title: Language
description: Section 13 of the legacy nodejs-kb notes.
tags: [kb-nodejs]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "nodejs-kb#13"
---

# Language

[↑ nodejs-kb](/kb-nodejs/README.md)

## 13.1 Object API

### 13.1.1 Object.assign

#### 13.1.1.1 Object.assign copy idiom, why should pass {} as first arg

```text
demo, foo w/o{} as first arg 
foosafe with {} as first arg

   $ node
> function foo(bar){
... 
... let src = {a:'b'};
... let ob = Object.assign(bar,src);
... console.log(ob);
... }
undefined
> foo({})
{ a: 'b' }
> foo({c:'d'});
{ c: 'd', a: 'b' }
> foo(null);
Thrown:
TypeError: Cannot convert undefined or null to object
    at Function.assign (<anonymous>)
    at foo (repl:4:17)
> foo(undefined);
Thrown:
TypeError: Cannot convert undefined or null to object
    at Function.assign (<anonymous>)
    at foo (repl:4:17)
> function foosafe(bar){
... let src = {a:'b'};
... let ob = Object.assign({},bar,src);
... console.log(ob);
... }
> foosafe({})
{ a: 'b' }
> foosafe({c:'d'})
{ c: 'd', a: 'b' }
> foosafe(null)
{ a: 'b' }
> foosafe({})
{ a: 'b' }
> foosafe(undefined)
{ a: 'b' } 
> foosafe()
{ a: 'b' }
> foo()
Thrown:
TypeError: Cannot convert undefined or null to object
    at Function.assign (<anonymous>)
    at foo (repl:4:17)
        13.1.2

    13.2
```
