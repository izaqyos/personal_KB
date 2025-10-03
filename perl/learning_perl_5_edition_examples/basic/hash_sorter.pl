#!/usr/bin/perl 
#===============================================================================
#
#         FILE:  hash_sorter.pl
#
#        USAGE:  ./hash_sorter.pl  
#
#  DESCRIPTION:  
## [15] Make a program that will print the following hash's data sorted in case-insensitive alphabetical order by last name. When the last names are the same, sort those by first name (again, without regard for case). That is, the first name in the output should be Fred's, while the last one should be Betty's. All of the people with the same family name should be grouped together. Don't alter the data. The names should be printed with the same capitalization as shown here. (You can find the source code to create a hash like this in the file sortable_hash with the other downloaded files.)
#
#my %last_name = qw{
#  fred flintstone Wilma Flintstone Barney Rubble
#  betty rubble Bamm-Bamm Rubble PEBBLES FLINTSTONE
#};
#
#      OPTIONS:  ---
# REQUIREMENTS:  ---
#         BUGS:  ---
#        NOTES:  ---
#       AUTHOR:  Yosi Izaq (YI), izaqyos@gmail.com
#      COMPANY:  Cisco systems
#      VERSION:  1.0
#      CREATED:  05/06/09 15:13:22
#     REVISION:  ---
#===============================================================================

use strict;
use warnings;

my %last_name = qw{
  fred flintstone Wilma Flintstone Barney Rubble
  betty rubble Bamm-Bamm Rubble PEBBLES FLINTSTONE
};

my @names = sort by_last_and_then_first_name keys %last_name;

sub by_last_and_then_first_name {
  "\L$last_name{$a}" cmp "\L$last_name{$b}"  # sort by first name, case insensitive
    or
  "\L$a" cmp "\L$b"                  # If last name is same then sort by first name
}

foreach (sort by_last_and_then_first_name keys %last_name) {
	print $_, "\n";
}

## Textbook solution
#Here's one way to do it:
#
## don't forget to incorporate the hash %last_name,
## either from the exercise text or the downloaded file
#
#my @keys = sort {
#  "\L$last_name{$a}" cmp "\L$last_name{$b}"  # by last name
#   or
#  "\L$a" cmp "\L$b"                          # by first name
#} keys %last_name;
#
#foreach (@keys) {
#  print "$last_name{$_}, $_\n";              # Rubble,Bamm-Bamm
#}
#
#
#There's not much to say about this one; we put the keys in order as needed, then print them out. We chose to print them in last-name-comma-first-name order just for fun (the exercise description left that up to you).
