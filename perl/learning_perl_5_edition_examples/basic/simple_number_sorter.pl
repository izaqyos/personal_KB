#!/usr/bin/perl 
#===============================================================================
#
#         FILE:  simple_number_sorter.pl
#
#        USAGE:  ./simple_number_sorter.pl  
#
#  DESCRIPTION:  read a list of numbers and sort them numerficically. print results in a right justified column 
#
#      OPTIONS:  ---
# REQUIREMENTS:  ---
#         BUGS:  ---
#        NOTES:  ---
#       AUTHOR:  Yosi Izaq (YI), izaqyos@gmail.com
#      COMPANY:  Cisco systems
#      VERSION:  1.0
#      CREATED:  04/20/09 17:08:45
#     REVISION:  ---
#===============================================================================

use strict;
use warnings;

## My version
#sub by_number {
#  # a sort subroutine, expect $a and $b
#  if ($a < $b) { -1 } elsif ($a > $b) { 1 } else { 0 }
#}
#
#my @result = sort by_number @ARGV;
#
#my $format="%20s\n"x@result;
#printf  $format, @result;
##print @result ;

# My version works on argv and should be run like this:
#[yizaq@yytzhak-wxp:Wed May 06:/cygdrive/c/work/KB/perl/learning_pe159 -10 1.5 4 2001 90210 666]$ ./simple_number_sorter.pl 17 1000 04 1.50 3.141
#                 -10
#                1.50
#                 1.5
#             3.14159
#                  04
#                   4
#                  17
#                 666
#                1000
#                2001
#               90210

# Textbook answer
# Note that they use the <> operator for accepting input in all forms
# and the spaceship opertor <=> for the sort routine
my @numbers;
push @numbers, split while <>;
foreach (sort { $a <=> $b } @numbers) {
  printf "%20g\n", $_;
  }
#
#
#  That second line of code is too confusing, isn't it? Well, we did that on purpose. Although we recommend that you write clear code, some people like writing code that's as hard to understand as possible,[*] so we want you to be prepared for the worst. Someday, you'll need to maintain confusing code like this.
#
#      [*] Well, we don't recommend it for normal coding purposes, but it can be a fun game to write confusing code, and it can be educational to take someone else's obfuscated code examples and spend a weekend or two figuring out just what they do. If you want to see some fun snippets of such code and maybe get a little help with decoding them, ask around at the next Perl Mongers' meeting. Or search for JAPHs on the Web, or see how well you can decipher the example obfuscated code block near the end of this chapter's answers.
#
#	  Since that line uses the while modifier, it's the same as if it were written in a loop like this:
#
#	  while (<>) {
#	    push @numbers, split;
#		}
#
#
#		That's better, but maybe it's still a little unclear. (Nevertheless, we don't have a quibble about writing it this way. This one is on the correct side of the "too hard to understand at a glance" line.) The while loop is reading the input a line at a time (from the user's choice of input sources, as shown by the diamond operator), and split is, by default, splitting that on whitespace to make a list of wordsor, in this case, a list of numbers. The input is just a stream of numbers separated by whitespace, after all. Either way that you write it, then, that while loop will put all of the numbers from the input into @numbers.
#
#		The foreach loop takes the sorted list and prints each one on its own line, using the %20g numeric format to put them in a right-justified column. You could have used %20s instead. What difference would that make? Well, that's a string format, so it would have left the strings untouched in the output. Did you notice that our sample data included both 1.50 and 1.5, and both 04 and 4? If you printed those as strings, the extra zero characters will still be in the output; but %20g is a numeric format, so equal numbers will appear identically in the output. Either format could potentially be correct, depending upon what you're trying to do.my @numbers;

# The Textbook version accepts file inputs (the files consist of lines of numbers) and should be run like this:
#[yizaq@yytzhak-wxp:Wed May 06:/cygdrive/c/work/KB/perl/learning_perl_5_edition_examples/basic:]$ echo "17 1000 04 1.50 3.14159 -10 1.5 4 2001 90210 666" |  ./simple_number_sorter.pl
#                 -10
#                 1.5
#                 1.5
#             3.14159
#                   4
#                   4
#                  17
#                 666
#                1000
#                2001
#               90210

