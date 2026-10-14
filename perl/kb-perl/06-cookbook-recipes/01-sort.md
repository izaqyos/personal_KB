---
type: reference
title: sort
description: Perl Cookbook recipes for sorting hashes by key or value.
tags: [perl, sorting, examples, book-notes, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "perl/KB_perl#6.1"
---

# 6.1 sort

[↑ cookbook Recipes](/perl/kb-perl/06-cookbook-recipes/README.md)

### 6.1.1 "sort" a hash

#### 6.1.1.1 "sort" a hash by key

```text
Question: How do I sort a Perl hash by the hash key?

Answer: Sorting the output of a Perl hash by the hash key is fairly straightforward. It involves two Perl functions, keys and sort, along with the good old foreach statement.

This is easiest to demonstrate by example. Suppose we have a class of five students. Their names are kim, al, rocky, chrisy, and jane.

Creating a Perl hash
Suppose these students just took a test, and we stored their grades in a hash named grades (note that hashes were called associative arrays prior to the release of Perl 5).

The hash definition might look like this:

%grades = (
	kim       => 96,
	al        => 63,
	rocky     => 87,
	chrisy    => 96,
	jane      => 79,
);
If you're familiar with a Perl hash, you know that the student names are the hash keys, and the test scores are the hash values.

Printing a Perl hash
If you want to print out the student names and scores, sorted in alphabetical order by student name, you can use this following Perl code snippet:

print "\n\tGRADES SORTED BY STUDENT NAME:\n";
foreach $key (sort (keys(%grades))) {
   print "\t\t$key \t\t$grades{$key}\n";
}
The Perl keys function returns a normal array of the keys of the hash. Our sample hash is named grades, so the keys function returns the names of the students. One attribute of the keys function, however, is that the keys are returned in what appears to be a random order. Therefore, you need to use sort to sort the keys in alphabetical order to get the desired printout.
```

#### 6.1.1.2 "sort" a hash by value

```text
Sorting a Perl hash by the hash value
Sorting a Perl hash by the hash value is a bit more difficult than sorting the hash by the key, but it's not too bad. It just requires a small "helper" function. This is easiest to demonstrate by example.

Suppose we have a class of five students. Rather than give them names, we'll call them student1, student2, etc. Suppose these students just took a test, and we stored their grades in a hash (called associative arrays prior to the release of Perl 5) named grades.

The hash definition might look like this:

%grades = (
	student1 => 90,
	student2 => 75,
	student3 => 96,
	student4 => 55,
	student5 => 76,
);
If you're familiar with hashes, you know that the student names are the keys, and the test scores are the hash values.

The key to sorting a hash by value is the function you create to help the sort command perform it's function. Following the format defined by the creators of Perl, you create a function I call a helper function that tells Perl how to sort the list it's about to receive. In the case of the program you're about to see, I've created two helper functions named hashValueDescendingNum (sort by hash value in descending numeric order) and hashValueAscendingNum (sort by hash value in ascending numeric order).


 
A complete Perl hash sort sample program
Here's a complete Perl hash sort sample program that prints the contents of the grades hash, sorted numerically by the hash value:

#!/usr/bin/perl -w

#----------------------------------------------------------------------#
#  printHashByValue.pl                                                 #
#----------------------------------------------------------------------#

#----------------------------------------------------------------------#
#  FUNCTION:  hashValueAscendingNum                                    #
#                                                                      #
#  PURPOSE:   Help sort a hash by the hash 'value', not the 'key'.     #
#             Values are returned in ascending numeric order (lowest   #
#             to highest).                                             #
#----------------------------------------------------------------------#

sub hashValueAscendingNum {
   $grades{$a} <=> $grades{$b};
}


#----------------------------------------------------------------------#
#  FUNCTION:  hashValueDescendingNum                                   #
#                                                                      #
#  PURPOSE:   Help sort a hash by the hash 'value', not the 'key'.     #
#             Values are returned in descending numeric order          #
#             (highest to lowest).                                     #
#----------------------------------------------------------------------#

sub hashValueDescendingNum {
   $grades{$b} <=> $grades{$a};
}


%grades = (
	student1 => 90,
	student2 => 75,
	student3 => 96,
	student4 => 55,
	student5 => 76,
);

print "\nGRADES IN ASCENDING NUMERIC ORDER:\n";
foreach $key (sort hashValueAscendingNum (keys(%grades))) {
   print "\t$grades{$key} \t\t $key\n";
}

print "\nGRADES IN DESCENDING NUMERIC ORDER:\n";
foreach $key (sort hashValueDescendingNum (keys(%grades))) {
   print "\t$grades{$key} \t\t $key\n";
}
Although this "Perl hash sort by value" program is fairly lengthy, you can see at the bottom of the code where the student grades are printed in ascending and descending numeric value.
			6.1.1.3

		6.1.2
```
