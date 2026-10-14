---
type: reference
title: Bit manipulation
description: "Legacy Python KB section: Bit manipulation (Binary buffers., struct)"
tags: [bit-manipulation, python, legacy]
generated: { by: "human:izaqyos", at: "2026-10-14T00:00:00Z" }
stale_after: "2028-10-14T00:00:00Z"
sources:
  - { id: py-int-methods, resource: "https://docs.python.org/3/library/stdtypes.html#additional-methods-on-integer-types", title: "Python 3 docs: Additional methods on integer types" }
  - { id: py3-whatsnew, resource: "https://docs.python.org/3/whatsnew/3.0.html", title: "What's New In Python 3.0" }
  - { id: py-struct, resource: "https://docs.python.org/3/library/struct.html", title: "Python 3 docs: struct — Interpret bytes as packed binary data" }
status: stable
capture_type: source
legacy_source: "python/KB_python#8"
---

# Bit manipulation:

[↑ KB_python](/python/kb-python/README.md)

## 8.1 http://wiki.python.org/moin/BitManipulation

> Updated 2026-10 to current practice.[^py-int-methods]

The original wiki notes were written for Python 2.4, before binary literals and `bin()` existed, and used `print` statements and `L` longs. Everything below is Python 3. All integers are arbitrary precision, and `0b…`, `0o…`, `0x…` literals plus `bin()`/`oct()`/`hex()` are built in.

Manipulations:

```python
>>> int('00100001', 2)                  # binary string -> int
33
>>> "0x%x" % int('11111111', 2)         # -> hex string (no need for multiples of 8 bits)
'0xff'
>>> hex(int('0110110110', 2))
'0x1b6'
>>> f"{int('0010101110101100111010101101010111110101010101', 2):#x}"
'0xaeb3ab57d55'
>>> chr(int('111011', 2))                # chr() takes any Unicode code point now
';'
>>> ord('u'), chr(117)
(117, 'u')
>>> [1 << n for n in range(8)]          # individual bits
[1, 2, 4, 8, 16, 32, 64, 128]
```

Transformations summary:

| From → To | Python 3 |
|---|---|
| `"1011101101"` → int | `int(s, 2)` |
| `"m"` → int | `ord(s)` |
| `"0xdecafbad"` / `"decafbad"` → int | `int(s, 16)` (accepts the `0x` prefix). `int(s, 0)` infers the base from the prefix |
| int → `"1011101101"` | `bin(n)` → `'0b1011101101'`; `f"{n:b}"` or `format(n, '08b')` for no prefix / zero-padded |
| int → `"m"` | `chr(n)` (the original said `chr(str)`, which was a typo) |
| int → `"0xdecafbad"` | `hex(n)` or `f"{n:#x}"` |
| int → `"decafbad"` | `f"{n:x}"` or `"%x" % n` |
| int ↔ bytes | `n.to_bytes(4, 'big')`, `int.from_bytes(b, 'big')` (3.2+) |
| hex string ↔ bytes | `bytes.fromhex('decafbad')`, `b.hex()` |

Bit helpers: `n.bit_length()` (3.1+) and `n.bit_count()` (number of set bits, 3.10+):

```python
>>> x = 0b10110110
>>> x.bit_length(), x.bit_count()
(8, 5)
```

The original's `eval("0xdecafbad")` trick and hand-written `hex_to_integer()` / `bin()` helpers are no longer needed. `int(s, 16)` and the built-in `bin()` cover them, and never `eval` untrusted input.

Related stdlib modules: `struct`, `array`, `binascii`, and `enum.IntFlag` for named bit flags. pySerial gives access to the serial port.

## 8.2 http://aspn.activestate.com/ASPN/Cookbook/Python/Recipe/113799

> Updated 2026-10 to current practice.[^py3-whatsnew]

Bitfield manipulation recipe, ported to Python 3. `__getslice__`/`__setslice__` were removed in Python 3, so slices now arrive in `__getitem__`/`__setitem__` as `slice` objects. The `L` long suffix is gone too.

```python
# bitfield manipulation
class bf:
    def __init__(self, value=0):
        self._d = value

    def __getitem__(self, index):
        if isinstance(index, slice):            # k[start:end]
            start, end = index.start, index.stop
            mask = (1 << (end - start)) - 1
            return (self._d >> start) & mask
        return (self._d >> index) & 1

    def __setitem__(self, index, value):
        if isinstance(index, slice):
            start, end = index.start, index.stop
            mask = (1 << (end - start)) - 1
            value = (value & mask) << start
            mask <<= start
        else:
            value = (value & 1) << index
            mask = 1 << index
        self._d = (self._d & ~mask) | value

    def __int__(self):
        return self._d

k = bf()
k[3:7] = 5
print(k[3])      # 1
print(k[5])      # 1
k[7] = 1
print(k[4:8])    # 10
print(int(k))    # 168
```

## 8.3 Binary buffers.

> Updated 2026-10 to current practice.[^py3-whatsnew]

8.3.1: In Python 3, `str` is Unicode text. Use **`bytes`** (immutable) or **`bytearray`** (mutable) as a binary buffer. They can hold any byte value, including 0 and control characters. `memoryview` gives zero-copy slices.

```python
>>> buf = bytearray(b'\x00\x01abc\x7f')
>>> list(buf)          # individual byte values
[0, 1, 97, 98, 99, 127]
>>> buf.hex(' ')
'00 01 61 62 63 7f'
```

### 8.3.2 struct

> Updated 2026-10 to current practice.[^py-struct]

Use `struct` to pack and unpack binary data to/from `bytes`. Give an explicit byte order (`>` big-endian / network, `<` little-endian). Without one, the native byte order and alignment apply and the output differs by platform. For example, `pack('hhl', 1, 2, 3)` is 16 bytes on 64-bit macOS/Linux, not the 8 bytes the old tutorial showed.

```python
>>> from struct import pack, unpack, calcsize
>>> pack('>bhl', 1, 2, 3)
b'\x01\x00\x02\x00\x00\x00\x03'
>>> unpack('>bhl', b'\x01\x00\x02\x00\x00\x00\x03')
(1, 2, 3)
>>> calcsize('>bhl')
7
```

[^py-int-methods]: Python 3 docs: Additional methods on integer types
[^py3-whatsnew]: What's New In Python 3.0
[^py-struct]: Python 3 docs: struct — Interpret bytes as packed binary data
