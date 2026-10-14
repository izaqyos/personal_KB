---
type: reference
title: Arrays
description: "Perl Cookbook arrays chapter: specifying a list in a program."
tags: [perl, book-notes, data-structures, examples, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "perl/KB_perl#6.4"
---

# 6.4 Arrays

[↑ cookbook Recipes](/perl/kb-perl/06-cookbook-recipes/README.md)

```text
	Works of art, in my opinion, are the only objects in the material universe to possess internal order, and that is why, though I don’t believe that only art matters, I do believe in Art for Art’s sake.
	—E.M. Forster
Introduction

If you are asked about the contents of your pockets, or the names of the first three Greek letters, or how to get to the highway, you recite a list: you name one thing after another in a particular order. Lists are part of your conception of the world. With Perl’s powerful list- and array-handling primitives, you can translate this world view directly into code.

In this chapter, we’ll use the terms list and array as the Perl language thinks of them. Take ("alpha", "beta", "gamma"); that’s a list of the names of the first three Greek letters, in order. To store that list into a variable, use an array, as in @greeks = ("alpha", "beta", "gamma"). Both are ordered groups of scalar values; the difference is that an array is a named variable, one whose array length can be directly changed, whereas a list is a more ephemeral notion. You might think of an array as a variable and a list as the values it contains.

This distinction may seem arbitrary, but operations that modify the length of these groupings (like push and pop) require a proper array and not merely a list. Think of the difference between $a and 4. You can say $a++ but not 4++. Likewise, you can say pop(@a) but not pop (1,2,3).

The most important thing to glean from this is that Perl’s lists and arrays are both ordered groupings of scalars. Operators and functions that work on lists or arrays are designed to provide faster or more convenient access to the elements than manual access would provide. Since few actually deal with modifying the array’s length, you can usually use arrays and lists interchangeably.

You can’t use nested parentheses to create a list of lists. If you try that in Perl, your lists get flattened, meaning that both these lines are equivalent:

@nested = ("this", "that", "the", "other");
@nested = ("this", "that", ("the", "other"));

Why doesn’t Perl (usefully) just support nested lists directly? Although partially for historical reasons, this easily allows for operations (like print or sort) that work on arbitrarily long lists of arbitrary contents.

What happens if you want a more complex data structure, such as an array of arrays or an array of hashes? Remember that scalars aren’t restricted to containing just numbers or strings; they can also hold references. Complex (multilevel) data structures in Perl are always put together using references. Therefore, what appear to be “two-dimensional arrays” or “arrays of arrays” are always implemented as arrays of array references, in the same way that two-dimensional arrays in C can be arrays of pointers to arrays.

Most recipes in this chapter don’t care what you keep in your arrays; for example, the problem of merging two arrays is the same whether the arrays contains strings, numbers, or references. Some problems are intrinsically tied to the contents of your arrays; recipes for those are in Chapter 11. This chapter’s recipes deal with generic arrays.

Let’s have some more terminology. The scalar items in an array or list are called elements, which you access by specifying their position, or index. Indices in Perl start at 0. So, given this list:

@greeks = ( "alpha", "beta", "gamma" );

"alpha" is in the first position, but you’d access it as $greeks[0]. "beta" is in the second position, but you’d access it as $greeks[1]. This structure is doubly justified: the contrariness of computers, whose first representable number is 0, and the contrariness of language designers, who chose 0 because it is an offset into the array, not the ordinal number of the element.
```

### 6.4.1 Specifying a List in Your Program

```text
Problem

You want to include a list in your program. This is how you initialize arrays.
Solution

You can write out a comma-separated list of elements:

@a = ("quick", "brown", "fox");

If you have a lot of single-word elements, use the qw( ) operator:

@a = qw(Meddle not in the affairs of wizards.);

If you have a lot of multiword elements, use a here document and extract lines:

@lines = (<< "END_OF_HERE_DOC" =~ /^\s*(.+)/gm);
    I sit beside the fire and think
    of all that I have seen,
    of meadow-flowers and butterflies 
    and summers that have been;
END_OF_HERE_DOC

Discussion

The first technique is the one most commonly used, often because only small arrays are normally initialized as program literals. Initializing a large array would fill your program with values and make it hard to read, so such arrays either tend to be initialized in a separate library file (see Chapter 12), or else have their values read in from a file:

@bigarray = ( );
open(FH, "<", "myinfo")   or die "Couldn't open myinfo: $!";
while (<FH>) {
    chomp;
    push(@bigarray, $_);
}
close(FH);

The second technique uses qw( ), one of several pseudo-functions in Perl used for quoting without having to resort to actual quotation marks. This one splits its string argument on whitespace to produce a list of words, where “words” in this instance means strings that don’t contain any whitespace. The initial argument is not subject to interpolation of variables or (most) backslash escape sequences.

@banner = ('Costs', 'only', '$4.95');
@banner = qw(Costs only $4.95);
@banner = split(' ', 'Costs only $4.95');

You can use qw( ) only when each whitespace-separated argument is to be a distinct element in the return list. Be careful not to give Columbus four ships instead of three:

@ships  = qw(Niña Pinta Santa María);               # WRONG
@ships  = ('Niña', 'Pinta', 'Santa María');         # right

The third solution takes a here document, which is a single, multiline string, and applies a global pattern match to that string. The pattern /^\s*(.+)/ says to skip any whitespace at the start of the line, then capture everything through the end of each line. The /g modifier means to apply that match globally, and the /m modifier says to permit ^ to match not just at the beginning of the string, but also immediately after a newline, which, in a multiline string, is just what you need. Applying that technique to the ships example yields:

@ships = ( << "END_OF_FLOTILLA" =~ /^\s*(.+)/gm);
              Niña
              Pinta 
              Santa María
END_OF_FLOTILLA

See Also

The “List Value Constructors” section of perldata(1); the “List Values and Arrays” section of Chapter 2 of Programming Perl; the “Quote and Quote-Like Operators” section of perlop(1); the s/// operator in perlop(1) and Chapter 5 of Programming Perl

		6.4.2  
		6.4.3  
		6.4.4  
		6.4.5  
		6.4.6  
		6.4.7  
		6.4.8  
		6.4.9  
		6.4.10 
		6.4.11 
		6.4.12 
		6.4.13 
		6.4.14 
		6.4.15 
		6.4.16 
		6.4.17 
		6.4.18 
		6.4.19 
		6.4.20 
		6.4.21 


	6.5 
	6.6 
	6.7 
	6.8 
	6.9 
	6.10
	6.11
	6.12
	6.13
	6.14
	6.15
	6.16
	6.17
	6.18
	6.19
	6.20
	6.21
	6.22
```
