---
type: reference
title: Operators
description: "C++ operators, starting with bitwise operators."
tags: [cpp, bit-manipulation, legacy, reference, examples]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-cpp#15"
---

# Operators

[↑ kb-cpp](/kb-cpp/README.md)

## 15.1 Bitwise Operators

```text
	C++ provides operators to work with the individual bits in ints. For this to be useful, you must have some idea of how integers are represented in binary. For example the decimal number 3 is represented as 11 in binary and the decimal number 5 is represented as 101 in binary.
	The bitwise operators
	Operator	Name	Description
	a&b	and	1 if both bits are 1. 3 & 5 is 1.
	a|b	or	1 if either bit is 1. 3 | 5 is 7.
	a^b	xor	1 if both bits are different. 3 ^ 5 is 6.
	~a	not	This unary operator inverts the bits. If ints are stored as 32-bit integers, ~3 is 11111111111111111111111111111100.
	n<<p	left shift	shifts the bits of n left p positions. Zero bits are shifted into the low-order positions. 3 << 2 is 12.
	n>>p	right shift	shifts the bits of n right p positions. If n is a 2's complement signed number, the sign bit is shifted into the high-order positions. 5 >> 2 is 1.
	Packing and Unpacking

	A common use of the bitwise operators (shifts with ands to extract values and ors to add values) is to pack multiple values in one int. [Bit-fields are another way to do this.]

	For example, let's say you have the following integer variables: age (range 0-127 requires 7 bits), gender (range 0-1 requires 1 bit), and height (range 0-127 requires 7 bits). These can be packed and unpacked into/from one int by using only the minimum number of bits to represent each variable. The 15 bits that these require could be stored like this (A for age, G for gender, and H for height).

int age, gender, height, packed_info;
    
. . .   // Assign values 

// Pack as AAAAAAA G HHHHHHH using shifts and "or"
packed_info = (age << 8) | (gender << 7) | height;

// Unpack with shifts and masking using "and"
height = packed_info & 0x7F;   // This constant is binary ...01111111
gender = (packed_info >> 7) & 1;
age    = (packed_info >> 8);


If you're using a CPU whose shift speed depends on the distance of the shift, you can use the following nested expression to pack the fields. However, I believe most newer CPUs don't depend on the shift distance.

packed_info = (((age << 1) | gender) << 7) | height;

Setting flag bits

Some library functions take an int that contains bits, each of which represents a true/false (bool) value. This saves a lot of space and can be fast to process. [needs example]
Don't confuse && and &

Don't confuse &&, which is the short-circuit logical and, with &, which is the uncommon bitwise and. They may not produce the same result in a logical expression.
Shift left multiplies by 2; shift right divides by 2

On some older computers is was faster to shift instead of multiply or divide by a power of two. For example, to multiply x by 8 and put it in y,

y = x << 3;  // Assigns 8*x to y.

Flipping between on and off with xor

Sometimes xor is used to flip between 1 and 0.

x = x ^ 1;   // or the more cryptic x ^= 1;

In a loop this will change x alternately between 0 and 1.
Exchanging values with xor

Here's some weird code I ran across once. It uses xor to exchange two values (x and y). Never use it; this is just a curiosity from the museum of bizarre code.

x = x ^ y;
y = x ^ y;
x = x ^ y;

	15.2
```
