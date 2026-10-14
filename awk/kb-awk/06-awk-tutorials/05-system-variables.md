---
type: reference
title: System Variables
description: Subsection 5.5 of Awk Tutorials.
tags: [kb-awk, awk, tutorials, tutorialspoint]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "awk/kb_awk#5.5"
---

# 5.5 System Variables

[↑ Awk Tutorials](/awk/kb-awk/06-awk-tutorials/README.md)

```text
	There are a number of system or built-in variables defined by awk. Awk has two types of system variables. The first type defines values whose default can be changed, such as the default field and record separators. The second type defines values that can be used in reports or processing, such as the number of fields found in the current record, the count of the current record, and others. These are automatically updated by awk; for example, the current record number and input file name.
There are a set of default values that affect the recognition of records and fields on input and their display on output. The system variable FS defines the field separator. By default, its value is a single space, which tells awk that any number of spaces and/or tabs separate fields. FS can also be set to any single character, or to a regular expression.
The output equivalent of FS is OFS, which is a space by default.
Awk defines the variable NF to be the number of fields for the current input record. Changing the value of NF actually has side effects and is not well defined across different awk implementations (awk, nawk, gawk, mawk etc)

	Awk also defines RS, the record separator, as a newline. RS is a bit unusual; it's the only variable where awk only pays attention to the first character of the value.

	The output equivalent to RS is ORS, which is also a newline by default. In the next section, "Working with Multiline Records," we'll show how to change the default record separator. Awk sets the variable NR to the number of the current input record. It can be used to number records in a list. The variable FILENAME contains the name of the current input file. The variable FNR is useful when multiple input files are used as it provides the number of the current record relative to the current input file.

	Typically, the field and record separators are defined in the BEGIN procedure because you want these values set before the first input line is read. However, you can redefine these values anywhere in the script. In POSIX awk, assigning a new value to FS has no effect on the current input line; it only affects the next input line.

	Finally, POSIX added a new variable, CONVFMT, which is used to control number-to-string conversions. For example,

    str = (5.5 + 3.2) " is a nice value"

Here, the result of the numeric expression 5.5 + 3.2 (which is 8.7) must be converted to a string before it can be used in the string concatenation. CONVFMT controls this conversion. Its default value is "%.6g", which is a printf-style format specification for floating-point numbers. Changing CONVFMT to "%d", for instance, would cause all numbers to be converted to strings as integers. Prior to the POSIX standard, awk used OFMT for this purpose. OFMT does the same job, but controlling the conversion of numeric values when using the print statement. The POSIX committee wanted to separate the tasks of output conversion from simple string conversion. Note that numbers that are integers are always converted to strings as integers, no matter what the values of CONVFMT and OFMT may be.
```

### 5.5.1 Examples

```text
NR variable. Here's a revised print statement for the script that calculates student averages:

    print NR ".", $1, avg

Running the revised script produces the following output:

    a. john 87.4
    b. andrea 86
    c. jasper 85.6

After the last line of input is read, NR contains the number of input records that were read. It can be used in the END action to provide a report summary. Here's a revised version of the phonelist.awk script.

After the last line of input is read, NR contains the number of input records that were read. It can be used in the END action to provide a report summary. Here's a revised version of the phonelist.awk script.

    # phonelist.awk -- print name and phone number. 
    # input file -- name, company, street, city, state and zip, phone
    BEGIN { FS = ", *" }  # comma-delimited fields
    { print $1 ", " $6 } 
    END { 	print ""
    	print NR, "records processed." }

	This program changes the default field separator and uses NR to print the total number of records printed. Note that this program uses a regular expression for the value of FS. This program produces the following output:

    John Robinson, 696-0987
    Phyllis Chapman, 879-0900

    2 records processed.
The output field separator (OFS) is generated when a comma is used to separate the arguments in a print statement. You may have wondered what effect the comma has in the following expression:

    print NR ".", $1, avg

By default, the comma causes a space (the default value of OFS) to be output. For instance, you could redefine OFS to be a tab in a BEGIN action. Then the preceding print statement would produce the following output:

    1      john    87.4
    2      andrea  86
    3      jasper  85.6

    Another commonly used system variable is NF, which is set to the number of fields for the current record. As we'll see in the next section, you can use NF to check that a record has the same number of fields that you expect. You can also use NF to reference the last field of each record. Using the "$" field operator and NF produces that reference. If there are six fields, then "$NF" is the same as "$6."
```
