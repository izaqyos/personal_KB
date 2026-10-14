---
type: reference
title: An Acronym Processor
description: Awk acronym processor example that replaces acronyms from a loaded array.
tags: [awk, tutorial, legacy, examples, unix]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "awk/kb_awk#5.14"
---

# 5.14 An Acronym Processor

[↑ Awk Tutorials](/awk/kb-awk/06-awk-tutorials/README.md)

```text
	a program that scans a file for acronyms. Each acronym is replaced with a full text description, and the acronym in parentheses. If a line refers to "BASIC," we'd like to replace it with the description "Beginner's All-Purpose Symbolic Instruction Code" and put the acronym in parentheses afterwards. (This is probably not a useful program in and of itself, but the techniques used in the program are general and have many such uses.)

	a program that scans a file for acronyms. Each acronym is replaced with a full text description, and the acronym in parentheses. If a line refers to "BASIC," we'd like to replace it with the description "Beginner's All-Purpose Symbolic Instruction Code" and put the acronym in parentheses afterwards. (This is probably not a useful program in and of itself, but the techniques used in the program are general and have many such uses.)

	We can design this program for use as a filter that prints all lines, regardless of whether a change has been made. We'll call it awkro.

    awk '# awkro - expand acronyms 
    # load acronyms file into array "acro"
    FILENAME == "acronyms" {
    	split($0, entry, "\t")
    	acro[entry[1]] = entry[2]
    	next
    } 

    # process any input line containing caps 
    /[A-Z][A-Z]+/ {

    	# see if any field is an acronym
    	for (i = 1; i <= NF; i++)
    		if ( $i in acro ) {
    			# if it matches, add description 
    			$i = acro[$i] " (" $i ")"
    		}
    }

    {
    	# print all lines
    	print $0
    }' acronyms  $*

Let's first see it in action. Here's a sample input file.

    $ cat sample
    The USGCRP is a comprehensive 
    research effort that includes applied 
    as well as basic research.
    The NASA program Mission to Planet Earth 
    represents the principal space-based component
    of the USGCRP and includes new initiatives
    such as EOS and Earthprobes.

And here is the file acronyms:

    $ cat acronyms
    USGCRP	U.S. Global Change Research Program
    NASA	National Aeronautic and Space Administration
    EOS	Earth Observing System

Now we run the program on the sample file.

    $ awkro sample
    The U.S. Global Change Research Program (USGCRP) is a comprehensive
    research effort that includes applied
    as well as basic research.
    The National Aeronautic and Space Administration (NASA) program
    Mission to Planet Earth
    represents the principal space-based component
    of the U.S. Global Change Research Program (USGCRP) and includes new
    initiatives
    such as Earth Observing System (EOS) and Earthprobes.

We'll look at this program in two parts. The first part reads records from the acronyms file.

    # load acronyms file into array "acro"
    FILENAME == "acronyms" {
    	split($0, entry, "\t")
    	acro[entry[1]] = entry[2]
    	next
    }

The two fields from these records are loaded into an array using the first field as the subscript and assigning the second field to an element of the array. In other words, the acronym itself is the index to its description.

Note that we did not change the field separator, but instead used the split() function to create the array entry. This array is then used in creating an array named acro.

Here is the second half of the program:

    # process any input line containing caps 
    /[A-Z][A-Z]+/ {
    	# see if any field is an acronym
    	for (i = 1; i <= NF; i++)
    		if ( $i in acro ) {
    			acronym =$i 
    			# if it matches, add description 
    			$i = acro[$i] " (" $i ")"
    		}
    }

    {
    	# print all lines
    	print $0
    }

Only lines that contain more than one consecutive capital letter are processed by the first of the two actions shown here. This action loops through each field of the record. At the heart of this section is the conditional statement that tests if the current field ($i) is a subscript of the array (acro). If the field is a subscript, we replace the original value of the field with the array element and the original value in parentheses. (Fields can be assigned new values, just like regular variables.) Note that the insertion of the description of the acronym results in lines that may be too long. See the next chapter for a discussion of the length() function, which can be used to determine the length of a string so you can divide it up if it is too long.

Now we're going to change the program so it makes a replacement only the first time an acronym appears. After we've found it, we don't want to search for that acronym any more. This is easy to do; we simply delete that acronym from the array.

    if ( $i in acro ) {
    	# if it matches, add description 
    	$i = acro[$i] " (" $i ")"
    	# only expand the acronym once
    	delete acro[acronym]
    }

There are other changes that would be good to make. In running the awkro program, we soon discovered that it failed to match the acronym if it was followed by a punctuation mark. Our initial solution was not to handle it in awk at all. Instead, we used two sed scripts, one before processing:

    sed 's/\([^.,;:!][^.,;:!]*\)\([.,;:!]\)/\1 @@@\2/g'

and one after:

    sed 's/ @@@\([.,;:!]\)/\1/g'

A sed script, run prior to invoking awk, could simply insert a space before any punctuation mark, causing it to be interpreted as a separate field. A string of garbage characters (@@@) was also added so we'd be able to easily identify and restore the punctuation mark. (The complicated expression used in the first sed command makes sure that we catch the case of more than one punctuation mark on a line.)

This kind of solution, using another tool in the UNIX toolbox, demonstrates that not everything needs to be done as an awk procedure. Awk is all the more valuable because it is situated in the UNIX environment.

However, with POSIX awk, we can implement a different solution, one that uses a regular expression to match the acronym. Such a solution can be implemented with the match() and sub() functions described in the next chapter.
```
