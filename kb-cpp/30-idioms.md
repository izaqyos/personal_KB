---
type: reference
title: Idioms
description: Section 31 of the legacy kb-cpp notes.
tags: [kb-cpp]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-cpp#31"
---

# Idioms

[↑ kb-cpp](/kb-cpp/README.md)

## 31.1 Iteration

### 31.1.1 std vector

```text
- Normal
for(std::vector<T>::iterator it = v.begin(); it != v.end(); ++it) {
    /* std::cout << *it; ... */
}
Important is, always use the prefix increment form for iterators whose definitions you don't know. That will ensure your code runs as generic as possible.

- Using indices
for(std::vector<int>::size_type i = 0; i != v.size(); i++) {
    /* std::cout << someVector[i]; ... */
}

- Read only

-
for(std::vector<T>::const_iterator it = v.begin(); it != v.end(); ++it) {
    /* std::cout << *it; ... */
}
		31.1.2

	31.2
```
