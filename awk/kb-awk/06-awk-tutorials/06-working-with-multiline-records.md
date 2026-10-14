---
type: reference
title: Working with Multiline Records
description: "Working with multiline records in awk, such as block-format name and phone data."
tags: [awk, tutorial, legacy, examples, unix]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "awk/kb_awk#5.6"
---

# 5.6 Working with Multiline Records

[↑ Awk Tutorials](/awk/kb-awk/06-awk-tutorials/README.md)

```text
	read a record where each field consists of a single line
	 data is stored on file in block format. Instead of having all the information on one line, the person's name is on one line, followed by the company's name on the next line and so on. Here's a sample record:

    John Robinson
    Koren Inc.
    978 Commonwealth Ave.
    Boston
    MA 01760
    696-0987

    To process this data, we can specify a multiline record by defining the field separator to be a newline, represented as "\n", and set the record separator to the empty string, which stands for a blank line.

    BEGIN { FS = "\n"; RS = "" }

We can print the first and last fields using the following script:

    # block.awk - print first and last fields 
    # $1 = name; $NF = phone number

    BEGIN { FS = "\n"; RS = "" }

    { print $1, $NF }

Here's a sample run:

    $ awk -f block.awk phones.block
    John Robinson 696-0987
    Phyllis Chapman 879-0900
    Jeffrey Willis 914-636-0000
    Alice Gold (707) 724-0000
    Bill Gold 1-707-724-0000

    The two fields are printed on the same line because the default output separator (OFS) remains a single space. If you want the fields to be output on separate lines, change OFS to a newline. While you're at it, you probably want to preserve the blank line between records, so you must specify the output record separator ORS to be two newlines.

    OFS = "\n"; ORS = "\n\n"
```
