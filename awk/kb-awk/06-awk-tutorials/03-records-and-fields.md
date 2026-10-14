---
type: reference
title: Records and Fields
description: "Awk records and fields: referencing and separating fields with examples."
tags: [awk, tutorial, legacy, unix, examples]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "awk/kb_awk#5.3"
---

# 5.3 Records and Fields

[↑ Awk Tutorials](/awk/kb-awk/06-awk-tutorials/README.md)

```text
	 Awk takes each input line as a record and each word, separated by spaces or tabs, as a field. (The characters separating the fields are often referred to as delimiters.)
```

### 5.3.1 Referencing and Separating Fields

```text
		Awk allows you to refer to fields in actions using the field operator $. This operator is followed by a number or a variable that identifies the position of a field by number. "$1" refers to the first field, "$2" to the second field, and so on. "$0" refers to the entire input record. The following example displays the last name first and the first name second, followed by the phone number.

		example, print second first and then third field of each line in file
		awk '{ print $2, $1, $3 }' file

		$1 refers to the first name, $2 to the last name, and $3 to the phone number. The commas that separate each argument in the print statement cause a space to be output between the values. (Later on, we'll discuss the output field separator (OFS), whose value the comma outputs and which is by default a space.) In this example, a single input line forms one record containing three fields: there is a space between the first and last names and a tab between the last name and the phone number. If you wanted to grab the first and last name as a single field, you could set the field separator explicitly so that only tabs are recognized. Then, awk would recognize only two fields in this record.
		example:
		$ echo a b c d | awk 'BEGIN { one = 1; two = 2}
> { print $(one + two) }'
c

		You can change the field separator with the -F option on the command line. It is followed by the delimiter character (either immediately, or separated by whitespace). In the following example, the field separator is changed to a tab.

		$ awk -F"\t" '{ print $2 }' names

		Commas delimit fields in the following two address records.

    John Robinson,Koren Inc.,978 4th Ave.,Boston,MA 01760,696-0987 
    Phyllis Chapman,GVE Corp.,34 Sea Drive,Amesbury,MA 01881,879-0900

An awk program can print the name and address in block format.

    # blocklist.awk -- print name and address in block form.
    # input file -- name, company, street, city, state and zip, phone
    { 	print ""	# output blank line
    	print $1	# name
    	print $2	# company
    	print $3	# street 
    	print $4, $5	# city, state zip 
    }

	It is usually a better practice, and more convenient, to specify the field separator in the script itself. The system variable FS can be defined to change the field separator. Because this must be done before the first input line is read, we must assign this variable in an action controlled by the BEGIN rule.

    BEGIN { FS = "," }

    script to print out the names and phone numbers.

    # phonelist.awk -- print name and phone number. 
    # input file -- name, company, street, city, state and zip, phone

    BEGIN { FS = "," }  # comma-delimited fields

    { print $1 ", " $6 }


    To print only for lines that contain pattern MA,
    /MA/ { print $1 ", " $6 }

    To print only for lines that contain pattern MA in specific field, #5:
        $5 ~ /MA/   { print $1 ", " $6 }
    You can reverse the meaning of the rule by using bang-tilde (!~).
	$5 !~ /MA/   { print $1 ", " $6 }

	. The following regular expression looks for an area code.
	$6 ~ /1?(-| )?\(?[0-9]+\)?( |-)?[0-9]+-[0-9]+/
	The regular expression can be deciphered by breaking down its parts. "1?" means zero or one occurrences of "1". "(-|Figure )?" looks for either a hyphen or a space in the next position, or nothing at all. "\(?" looks for zero or one left parenthesis; the backslash prevents the interpretation of "(" as the grouping metacharacter. "[0-9]+" looks for one or more digits; note that we took the lazy way out and specified one or more digits rather than exactly three. In the next position, we are looking for an optional right parenthesis, and again, either a space or a hyphen, or nothing at all. Then we look for one or more digits "[0-9]+" followed by a hyphen followed by one or more digits "[0-9]+".
	This will match the following:
	707-724-0000
	(707) 724-0000
	(707)724-0000
	1-707-724-0000   
	1 707-724-0000   
	1(707)724-0000
```

### 5.3.2 Field Splitting

```text
	There are three distinct ways you can have awk separate fields. The first method is to have fields separated by whitespace. To do this, set FS equal to a single space. In this case, leading and trailing whitespace (spaces and/or tabs) are stripped from the record, and fields are separated by runs of spaces and/or tabs. Since the default value of FS is a single space, this is the way awk normally splits each record into fields.

The second method is to have some other single character separate fields. For example, awk programs for processing the UNIX /etc/passwd file usually use a ":" as the field separator. When FS is any single character, each occurrence of that character separates another field. If there are two successive occurrences, the field between them simply has the empty string as its value.

Finally, if you specify more than a single character as the field separator, it will be interpreted as a regular expression. That is, the field separator will be the "leftmost longest non-null and nonoverlapping" substring that matches the regular expression. You can see the difference between specifying:


    FS = "\t"

which causes each tab to be interpreted as a field separator, and:

    FS = "\t+"

which specifies that one or more consecutive tabs separate a field. Using the first specification, the following line would have three fields:

    abc\t\tdef

whereas the second specification would only recognize two fields. Using a regular expression allows you to specify several characters to be used as delimiters:

    FS = "[':\t]"

Any of the three characters in brackets will be interpreted as the field separator.

or, FS = "[':\t]+"  which will cause any consecutive run of those characters to be considered as field separator.
```
