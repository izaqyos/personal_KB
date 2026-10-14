---
type: reference
title: Templates
description: "C++ coding standard: brief advice on using templates."
tags: [cpp, coding-standards, guide, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-cpp#17.1.10"
---

# 17.1.10. Templates

[↑ C++ Coding Standard, http://www.possibility.com/Cpp/CppCodingStandard.html](/kb-cpp/17-coding-standards/01-c-coding-standard-http-www-possibility-com-cpp-cppcodingstan/README.md)

```text
Templates have never come up as an issue on project I've worked on, so my advice on templates isn't very useful.

Keeping templates simple has worked best. Just use templates for what they are good at, making a class work over different types. Not everything needs to be a template or needs to be perfectly generic. Because templates are so complex and so difficult to debug, it's best to use them only when necessary.

Template meta programming is too elite for me so I'll leave that to other people.
```
