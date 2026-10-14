---
type: reference
title: graphviz
description: "Graphviz install on Mac, simple dot usage and online resources."
tags: [drawing, macos, homebrew, howto, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "modeling-drawing-kb#2"
---

# graphviz

[↑ modeling-drawing-kb](/kb-modeling-drawing/README.md)

## 2.1 Install on mac

```text
2036  brew install graphviz
 2037  dot -h
$ cat simple.dot 
digraph d {
 A [label="Hello"]
 B [label="World"]
 C [label="Everyone"]
 A -> { B C }
}
 dot -T png -O  simple.dot
```

## 2.2 simple usage

## 2.3 online resources

```text
http://www.graphviz.org/gallery/
    2.4
3.
```
