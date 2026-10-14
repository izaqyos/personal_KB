---
type: reference
title: Bit manipulation
description: Section 8 of the legacy KB_python notes.
tags: [kb-python]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "python/KB_python#8"
---

# Bit manipulation:

[↑ KB_python](/python/kb-python/README.md)

## 8.1 http://wiki.python.org/moin/BitManipulation

```text
	Manipulations

To integer.
Toggle line numbers

    >>> print int('00100001', 2)
    33

To hex string. Note that you don't need to use x8 bits.
Toggle line numbers

   >>> print "0x%x" % int('11111111', 2)
   0xff
   >>> print "0x%x" % int('0110110110', 2)
   0x1b6
   >>> print "0x%x" % int('0010101110101100111010101101010111110101010101', 2)
   0xaeb3ab57d55

To character. 8 bits max.
Toggle line numbers

 >>> chr(int('111011', 2))
 ';'
 >>> chr(int('1110110', 2))
 'v'
 >>> chr(int('11101101', 2))
 '\xed'

Characters to integers, but not to strings of 1's and 0's.
Toggle line numbers

 >>> int('01110101', 2)
 117
 >>> chr(int('01110101', 2))
 'u'
 >>> ord('u')
 117

Individual bits.
Toggle line numbers

   >>> 1 << 0
   1
   >>> 1 << 1
   2
   >>> 1 << 2
   4
   >>> 1 << 3
   8
   >>> 1 << 4
   16
   >>> 1 << 5
   32
   >>> 1 << 6
   64
   >>> 1 << 7
   128

Transformations Summary

Strings to Integers:

    *

      "1011101101": int(str, 2)
    *

      "m": ord(str)
    *

      "0xdecafbad": int(str, 16) (known to work in Python 2.4)
    *

      "decafbad": int(str, 16) (known to work in Python 2.4)

Integers to Strings:

    *

      "1011101101": no built-in technique (see below)
    *

      "m": chr(str)
    *

      "0xdecafbad": hex(val)
    *

      "decafbad": "%x" % val

We are still left without a technique for producing binary strings, and decyphering hex strings.
Hex String to Integer

(not needed anymore)

One approach to decyphering "0xdecafbad" style hex strings, is to use eval:
Toggle line numbers

    >>> eval("0xdecafbad ")
    3737844653L

However, this could be dangerous, depending on where you're getting your data from.

Here's a function that is safer:
Toggle line numbers

   def hex_to_integer(h):
       """Convert a hex string to an integer.
   
       The hex string can be any length. It can start with an 0x, or not.
       Unrecognized characters will raise a ValueError.
   
       This function released into the public domain by it's author, Lion
       Kimbro.
       """
       num = 0  # Resulting integer
       h = h.lower()  # Hex string
       if h[:2] == "0x":
           h = h[2:]
       for c in h:  # Hex character
           num = num * 16
           if "0" <= c <= "9":
               num = num + (ord(c) - ord("0"))
           elif "a" <= c <= "f":
               num = num + (ord(c) - ord("a"))
               num = num + 10
           else:
               raise ValueError(c)
       return num

Integer to Bin String

It's high time Python supported binary literals (e.g. 0b10011000) and a bin() function!
Toggle line numbers

    >>> def bin(a):
            s=''
            t={'0':'000','1':'001','2':'010','3':'011',
               '4':'100','5':'101','6':'110','7':'111'}
            for c in oct(a)[1:]:
                    s+=t[c]
            return s

Research Links

this is the sort of thing we're looking for:

    *

      [WWW] ASPN: bit-field manipulation

related modules:

    *

      [WWW] array module -- (issued with Python)
    *

      [WWW] struct module -- (issued with Python)
    *

      [WWW] binascii module -- (issued with Python)
    *

      [WWW] pySerial module -- access the serial port

see also: BitwiseOperators
```

## 8.2 http://aspn.activestate.com/ASPN/Cookbook/Python/Recipe/113799

```text
	#
# bitfield manipulation
#

class bf(object):
    def __init__(self,value=0):
        self._d = value

    def __getitem__(self, index):
        return (self._d >> index) & 1 

    def __setitem__(self,index,value):
        value    = (value&1L)<<index
        mask     = (1L)<<index
        self._d  = (self._d & ~mask) | value

    def __getslice__(self, start, end):
        mask = 2L**(end - start) -1
        return (self._d >> start) & mask

    def __setslice__(self, start, end, value):
        mask = 2L**(end - start) -1
        value = (value & mask) << start
        mask = mask << start
        self._d = (self._d & ~mask) | value
        return (self._d >> start) & mask

    def __int__(self):
        return self._d

k = bf()
k[3:7]=5
print k[3]
print k[5]
k[7]=1
print k[4:8]
print int(k)
```

## 8.3 Binary buffers.

```text
		8.3.1	Strings in python can contain 0 and control chars, Unlike C, C++ and Jave!
		So a python string can perfectly well serve as a binary buffer (also a list can serve well), 
		but its content won't show in print unless the list of individual chars is printed via:
		>>> print list(buffer)
```

### 8.3.2 struct

```text
			use struct to pack and unpack binary data in python string format.
			see example from tutorial:
			>>> from struct import *
			>>> pack('hhl', 1, 2, 3)
			'\x00\x01\x00\x02\x00\x00\x00\x03'
			>>> unpack('hhl', '\x00\x01\x00\x02\x00\x00\x00\x03')
			(1, 2, 3)
			>>> calcsize('hhl')
			8
```
