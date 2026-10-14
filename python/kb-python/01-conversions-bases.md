---
type: reference
title: Conversions (bases)
description: "Legacy Python KB section: Conversions (bases) (convert decimal to hexa, Convert hex to decimal, Denary (base 10) to binary (base 2))"
tags: [bit-manipulation, python, legacy]
generated: { by: "human:izaqyos", at: "2026-10-14T00:00:00Z" }
stale_after: "2028-10-14T00:00:00Z"
status: stable
capture_type: source
legacy_source: "python/KB_python#1"
sources:
  - { id: py3-whatsnew, resource: "https://docs.python.org/3/whatsnew/3.0.html", title: "What's New In Python 3.0" }
  - { id: py-format-spec, resource: "https://docs.python.org/3/library/string.html#format-specification-mini-language", title: "Python docs: Format Specification Mini-Language" }
  - { id: py-bytes-hex, resource: "https://docs.python.org/3/library/stdtypes.html#bytes.hex", title: "Python docs: bytes.hex() and bytes.fromhex()" }
---

# Conversions (bases)

[↑ KB_python](/python/kb-python/README.md)

## 1.1 convert decimal to hexa

> Updated 2026-10 to current practice.[^py3-whatsnew]

`print` is a function in Python 3. Use an f-string / format spec (`x` = lowercase hex, `X` = uppercase, `#x` adds the `0x` prefix)[^py-format-spec]:

```python
print(f"{98:x}")    # 62
print(f"{98:#x}")   # 0x62
print(hex(98))      # 0x62
print("%x" % 98)    # 62  (printf-style still works, but f-strings are preferred)
```

## 1.2 Convert hex to decimal

```text
	>>> int ('6e', 16)  
```

## 1.3 Denary (base 10) to binary (base 2)

> Updated 2026-10 to current practice.[^py3-whatsnew]

The old hand-rolled loop used the Python 2 `raise ValueError, "..."` syntax, which is a `SyntaxError` in Python 3. The built-ins already do this:

```python
>>> bin(110)              # with prefix
'0b1101110'
>>> f"{110:b}"            # no prefix
'1101110'
>>> f"{110:024b}"         # fixed width, zero padded (replaces int2bin(n, 24))
'000000000000000001101110'
>>> int("1101110", 2)     # and back
110
```

If you want a function with validation:

```python
def denary_to_binary(n: int) -> str:
    """Convert a non-negative integer to a binary string."""
    if n < 0:
        raise ValueError("must be a non-negative integer")
    return format(n, "b")
```

## 1.4 String to int and vise versa

```text
		string to int: int(str_value)
		int to string: str(int_value)
```

## 1.5 Convert string to hex (Python)

> Updated 2026-10 to current practice.[^py-bytes-hex]

The old ActiveState recipe (496969) relied on `reduce` as a built-in, `string.atoi`, and the Python 2 `"hello".encode("hex")` codec; none of those work in Python 3. In Python 3 a `str` is text, so encode it to `bytes` first and use `bytes.hex()` / `bytes.fromhex()`:

```python
>>> "hello".encode().hex()                  # str -> hex string (UTF-8 bytes)
'68656c6c6f'
>>> "hello".encode().hex(" ")               # with a separator (3.8+)
'68 65 6c 6c 6f'
>>> bytes.fromhex("68656c6c6f").decode()    # hex string -> str
'hello'
```

For plain integers, `hex()` and `int(..., 16)` are all you need:

```python
>>> int("0x10AFCC", 16)
1093580
>>> hex(1093580)
'0x10afcc'
```

[^py3-whatsnew]: What's New In Python 3.0
[^py-format-spec]: Python docs: Format Specification Mini-Language
[^py-bytes-hex]: Python docs: bytes.hex() and bytes.fromhex()
