---
type: reference
title: "Nuts and bolts, odds and ends"
description: "C++ templates tricks and odds and ends, such as recursive template instantiation examples."
tags: [cpp, tips, examples, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-cpp#18"
---

# Nuts and bolts, odds and ends

[↑ kb-cpp](/kb-cpp/README.md)

## 18.1 templates

### 18.1.1 Push the limits of the meta compiler

```text
This code:
template <int i > 
class A: A<i+1>
{

};

int main(){

A<1> a;

return 0;
}

Will provoke this compilation error:
/users/<user>/stam.cpp:3:   instantiated from `A<14>'
/users/<user>/stam.cpp:3:   instantiated from `A<13>'
/users/<user>/stam.cpp:3:   instantiated from `A<12>'
/users/<user>/stam.cpp:3:   instantiated from `A<11>'
/users/<user>/stam.cpp:3:   instantiated from `A<10>'
/users/<user>/stam.cpp:3:   instantiated from `A<9>'
/users/<user>/stam.cpp:3:   instantiated from `A<8>'
/users/<user>/stam.cpp:3:   instantiated from `A<7>'
/users/<user>/stam.cpp:3:   instantiated from `A<6>'
/users/<user>/stam.cpp:3:   instantiated from `A<5>'
/users/<user>/stam.cpp:3:   instantiated from `A<4>'
/users/<user>/stam.cpp:3:   instantiated from `A<3>'
/users/<user>/stam.cpp:3:   instantiated from `A<2>'
/users/<user>/stam.cpp:3:   instantiated from `A<1>'
/users/<user>/stam.cpp:9:   instantiated from here

/users/<user>/stam.cpp:3: error: invalid use of undefined type `class A<501>'
/users/<user>/stam.cpp:3: error: declaration of `class A<501>'
```

## 18.2 Limits

```text
	climits (limits.h)
header
Sizes of integral types

This header defines constants with the limits of integral types for the specific system and compiler implemetation used.

The following panel shows the different constants and their guaranteed minimal magnitudes (positive numbers may be greater in value, and negative numbers may be less in value). Any particular compiler implementation may define integral types with greater magnitudes than those shown here:

name	expresses	min. magnitude*
CHAR_BIT	Number of bits for a char object (byte)	8
SCHAR_MIN	Minimum value for an object of type signed char	-127
SCHAR_MAX	Maximum value for an object of type signed char	127
UCHAR_MAX	Maximum value for an object of type unsigned char	255
CHAR_MIN	Minimum value for an object of type char	either SCHAR_MIN or 0
CHAR_MAX	Maximum value for an object of type char	either SCHAR_MAX or UCHAR_MAX
MB_LEN_MAX	Maximum number of bytes in a multibyte character, for any locale	1
SHRT_MIN	Minimum value for an object of type short int	-32767
SHRT_MAX	Maximum value for an object of type short int	32767
USHRT_MAX	Maximum value for an object of type unsigned short int	65535
INT_MIN	Minimum value for an object of type int	-32767
INT_MAX	Maximum value for an object of type int	32767
UINT_MAX	Maximum value for an object of type unsigned int	65535
LONG_MIN	Minimum value for an object of type long int	-2147483647
LONG_MAX	Maximum value for an object of type long int	2147483647
ULONG_MAX	Maximum value for an object of type unsigned long int	4294967295

* This is not necessarily the actual value of the constant in any particular compiler or system, it may be equal or greater in magnitude than this.	


	18.3
```
