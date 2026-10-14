---
type: reference
title: Portability
description: "C++ coding standard: portability rules such as typedef-ing fixed-size integer and float types."
tags: [cpp, coding-standards, guide, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-cpp#17.1.13"
---

# 17.1.13. Portability

[↑ C++ Coding Standard, http://www.possibility.com/Cpp/CppCodingStandard.html](/kb-cpp/17-coding-standards/01-c-coding-standard-http-www-possibility-com-cpp-cppcodingstan/README.md)

```text
Use Typedefs for Types
It's a good idea to typedef int8, int16, int32, int64, float32, float64, uint8, uint16, uint32, uint64, etc., instead of assuming it'll be done with int, long, float, and short.

Alignment of Class Members
There seems to be disagreement on how to align class data members. Be aware that different platforms have different alignment rules and it can be an issue. Alignment may also be an issue when using shared memory and shared libraries.

The real thing to remember when it comes to alignment is to put the biggest data members first, and smaller members later, and to pad with char[] so that the same structure would be used no matter whether the compiler was in "naturally aligned" or "packed" mode.

For the Mac there's no blanket "always on four byte boundaries" rule -- rather, the rule is "alignment is natural, but never bigger than 4 bytes, unless the member is a double and first in the struct in which case it is 8". And that rule was inherited from PowerOpen/AIX.

Compiler Dependent Exceptions
Using exceptions across the shared library boundary could cause some problems if the shared library and the client module are compiled by different compiler vendors.

Compiler Dependent RTTI
Different compilers are not guaranteed to name types the same.
```
