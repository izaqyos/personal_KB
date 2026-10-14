---
type: reference
title: itertools
description: "Legacy Python KB section: itertools (itertools basics, itertools accumulate)"
tags: [python, legacy, reference]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "python/KB_python#54"
---

# itertools

[↑ KB_python](/python/kb-python/README.md)

## 54.1 itertools basics

## 54.2 itertools accumulate

```text
accumulate()
This iterator takes two arguments, iterable target and the function which would be followed at each iteration of value in target. If no function is passed, addition takes place by default. If the input iterable is empty, the output iterable will also be empty.

Syntax
itertools.accumulate(iterable[, func]) –> accumulate object

In [1]: import itertools
In [2]: import operator
In [5]: asc = [i for i in range(6)]

In [6]: asc
Out[6]: [0, 1, 2, 3, 4, 5]
In [13]: sumasc = itertools.accumulate(asc)

In [14]: for s in sumasc:
    ...:     print(s)
    ...: 
0
1
3
6
10
15

In [15]: #as you can see addition is default

In [16]: #lets do mult using operator

In [17]: multasc = itertools.accumulate(asc, operator.mul)

In [18]: for s in multasc:
    ...:     print(s)
    ...: 
    ...: 
0
0
0
0
0
0

In [19]: asc = [i for i in range(1,7)]

In [20]: asc
Out[20]: [1, 2, 3, 4, 5, 6]

In [21]: multasc = itertools.accumulate(asc, operator.mul)

In [22]: for s in multasc:
    ...:     print(s)
    ...: 
    ...: 
1
2
6
24
120
720

In [23]: #now calc max and min

In [24]: 

In [24]: res = itertools.accumulate(asc, max)

In [25]: res
Out[25]: <itertools.accumulate at 0x10938b980>

In [26]: for s in res:
    ...:     print(s)
    ...: 
    ...: 
1
2
3
4
5
6

In [27]: res = itertools.accumulate(asc, min)

In [28]: for s in res:
    ...:     print(s)
    ...: 
    ...: 
1
1
1
1
1
1
    54.3
```
