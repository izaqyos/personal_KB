---
type: reference
title: Conversions (bases)
description: "Legacy Python KB section: Conversions (bases) (convert decimal to hexa, Convert hex to decimal, Denary (base 10) to binary (base 2))"
tags: [bit-manipulation, python, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "python/KB_python#1"
---

# Conversions (bases)

[↑ KB_python](/python/kb-python/README.md)

## 1.1 convert decimal to hexa

```text
	print "%x"%98
```

## 1.2 Convert hex to decimal

```text
	>>> int ('6e', 16)  
```

## 1.3 Denary (base 10) to binary (base 2)

```text
	def Denary2Binary(n):
    '''convert denary integer n to binary string bStr'''
    bStr = ''
    if n < 0:  raise ValueError, "must be a positive integer"
    if n == 0: return '0'
    while n > 0:
        bStr = str(n % 2) + bStr
        n = n >> 1
    return bStr
 
def int2bin(n, count=24):
    """returns the binary of integer n, using count number of digits"""
    return "".join([str((n >> y) & 1) for y in range(count-1, -1, -1)])
110
```

## 1.4 String to int and vise versa

```text
		string to int: int(str_value)
		int to string: str(int_value)
```

## 1.5 Convert string to hex (Python)

```text
## {{{ http://code.activestate.com/recipes/496969/ (r1)
#convert string to hex
def toHex(s):
    lst = []
    for ch in s:
        hv = hex(ord(ch)).replace('0x', '')
        if len(hv) == 1:
            hv = '0'+hv
        lst.append(hv)
    
    return reduce(lambda x,y:x+y, lst)

#convert hex repr to string
def toStr(s):
    return s and chr(atoi(s[:2], base=16)) + toStr(s[2:]) or ''
## end of http://code.activestate.com/recipes/496969/ }}}

5 comments
sasa sasa 3 years, 10 months ago  # | flag

list comprehensions. Though your snippet is nice, you should really have a look at least comprehensions. With a few built-in methods you can reduce your 8 lines of code (which is pretty slow because of the "extra work" I guess) to one:

toHex = lambda x:"".join([hex(ord(c))[2:].zfill(2) for c in x])

The builtin string-method "join" joins every element of the list to the string by re-using the string. ";;".join(['a', 'b', 'c']) would result in 'a;;b;;c'. Note that you can enhance the speed of the above snippet by replacing the [] with () what will change it from a list comprehension to a generator. Same enhancements can be done with your second function.

Regards, Stargaming
tomer filiba 3 years, 10 months ago  # | flag

encode and decode. this functionality already exists with the encodings library (which is built-in):

>>> "hello".encode("hex")
'68656c6c6f'
>>> "68656c6c6f".decode("hex")
'hello'
>>>

Adam Monsen 3 years, 2 months ago  # | flag

base 16 int conversion. The hex() and int() builtins should do everything you need...

>>> int('0x10AFCC', 16)
1093580
>>> hex(1093580)
'0x10afcc'

Adam Monsen 3 years, 2 months ago  # | flag

Nevermind, I should've read the original post more closely. As the other commenter said, str.encode() and str.decode() do the same thing as your code.
a 1 month, 3 weeks ago  # | flag

atoi() is deprecated. you should use int() instead
```
