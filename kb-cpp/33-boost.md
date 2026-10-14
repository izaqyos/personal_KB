---
type: reference
title: Boost
description: "Boost library notes, e.g. lexical_cast for converting numbers to strings."
tags: [boost, cpp, examples, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-cpp#34"
---

# Boost

[↑ kb-cpp](/kb-cpp/README.md)

## 34.1 lexical_cast , convert number to string (like itoa in C)

### 34.1.1 My example

```text
#include <boost/lexical_cast.hpp>
using boost::lexical_cast;
using boost::bad_lexical_cast;
test_res.s_remediation += ". Total number of servers: "+boost::lexical_cast<std::string>(iNumberOfGCs);

	34.2
```
