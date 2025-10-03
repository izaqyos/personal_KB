#!/usr/bin/perl
## Copyright (C) Mon Jan 12 11:38:48 2009 Yosi Izaq, Cisco Systems
use strict;
use 5.010;

#Write a program that asks the user to enter a list of strings on separate lines, printing each string in a right-justified, 20-character column. To be certain that the output is in the proper columns, print a "ruler line" of digits as well. (This is simply a debugging aid.) Make sure that you're not using a 19-character column by mistake! For example, entering hello, good-bye should give output something like this:
#
#123456789012345678901234567890123456789012345678901234567890
#               hello
#             good-bye
#

print "Please enter a list of strings on separate lines.\n";

my @lines=<STDIN>;
#chomp (my @lines=<STDIN>);

#This is how I printed the ruler:
#my $ruler="1234567890"x4;
#$ruler.="\n";
#print $ruler;

#And this is how it could be printed in one line
print "1234567890"x7,"12345\n";

##I have used a format string trick for printing the array w/o loop
#my $format="%21s"x@lines;
#printf  $format, @lines;

#To print with a loop do:
foreach (@lines) {
  printf "%20s\n", $_;
}
