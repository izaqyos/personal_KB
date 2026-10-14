---
type: reference
title: Multidimensional Arrays
description: "Multidimensional arrays in awk, with a bitmap example."
tags: [awk, tutorial, legacy, examples, data-structures]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "awk/kb_awk#5.15"
---

# 5.15 Multidimensional Arrays

[↑ Awk Tutorials](/awk/kb-awk/06-awk-tutorials/README.md)

```text
	Awk supports linear arrays in which the index to each element of the array is a single subscript. If you imagine a linear array as a row of numbers, a two-dimensional array represents rows and columns of numbers. You might refer to the element in the second column of the third row as "array[3, 2]." Two- and three-dimensional arrays are examples of multidimensional arrays. Awk does not support multidimensional arrays but instead offers a syntax for subscripts that simulate a reference to a multidimensional array. For instance, you could write the following expression:

    file_array[NR, i] = $i

where each field of an input record is indexed by its record number and field number. Thus, the following reference:

    file_array[2, 4]

would produce the value of the fourth field of the second record.

This syntax does not create a multidimensional array. It is converted into a string that uniquely identifies the element in a linear array. The components of a multidimensional subscript are interpreted as individual strings ("2" and "4," for instance) and concatenated together separated by the value of the system variable SUBSEP. The subscript-component separator is defined as "\034" by default, an unprintable character rarely found in ASCII text. Thus, awk maintains a one-dimensional array and the subscript for our previous example would actually be "2\0344" (the concatenation of "2," the value of SUBSEP, and "4"). The main consequence of this simulation of multidimensional arrays is that the larger the array, the slower it is to access individual elements. However, you should time this, using your own application, with different awk implementations (see Chapter 11, "A Flock of awks").

Here is a sample awk script named bitmap.awk that shows how to load and output the elements of a multidimensional array. This array represents a two-dimensional bitmap that is 12 characters in width and height.

    BEGIN { FS = ","   # comma-separated fields
    	# assign width and height of bitmap
    	WIDTH = 12
    	HEIGHT = 12
    	# loop to load entire array with "O"
    	for (i = 1; i <= WIDTH; ++i)
    		for (j = 1; j <= HEIGHT; ++j)
    			bitmap[i, j] = "O"
    }
    # read input of the form x,y. 
    {
    	# assign "X" to that element of array 
    	bitmap[$1, $2] = "X"
    }
    # at end output multidimensional array
    END {
    	for (i = 1; i <= WIDTH; ++i){
    		for (j = 1; j <= HEIGHT; ++j)
    			printf("%s", bitmap[i, j] )
    		# after each row, print newline
    		printf("\n")	
    	}
    }

Before any input is read, the bitmap array is loaded with O's. This array has 144 elements. The input to this program is a series of coordinates, one per line.

    $ cat bitmap.test
    1,1
    2,2
    3,3
    4,4
    5,5
    6,6
    7,7
    8,8
    9,9
    10,10
    11,11
    12,12
    1,12
    2,11
    3,10
    4,9
    5,8
    6,7
    7,6
    8,5
    9,4
    10,3
    11,2
    12,1

For each coordinate, the program will put an "X" in place of an "O" as that element of the array. At the end of the script, the same kind of loop that loaded the array, now outputs it. The following example reads the input from the file bitmap.test.

    $ awk -f bitmap.awk bitmap.test
    XOOOOOOOOOOX
    OXOOOOOOOOXO
    OOXOOOOOOXOO
    OOOXOOOOXOOO
    OOOOXOOXOOOO
    OOOOOXXOOOOO
    OOOOOXXOOOOO
    OOOOXOOXOOOO
    OOOXOOOOXOOO
    OOXOOOOOOXOO
    OXOOOOOOOOXO
    XOOOOOOOOOOX

The multidimensional array syntax is also supported in testing for array membership. The subscripts must be placed inside parentheses.

    if ((i, j) in array)

This tests whether the subscript i,j (actually, i SUBSEP j) exists in the specified array.

Looping over a multidimensional array is the same as with one-dimensional arrays.

    for (item in array)

You must use the split() function to access individual subscript components. Thus:

    split(item, subscr, SUBSEP)

creates the array subscr from the subscript item.

Note that we needed to use the loop-within-a-loop to output the two-dimensional bitmap array in the previous example because we needed to maintain rows and columns.
```
