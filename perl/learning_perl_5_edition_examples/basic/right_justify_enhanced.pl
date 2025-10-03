#!/usr/bin/perl
## Copyright (C) Mon Jan 12 11:38:48 2009 Yosi Izaq, Cisco Systems
use strict;
use 5.010;

#Write a program that asks the user to enter a list of strings on separate lines, printing each string in a right-justified, 20-character column. To be certain that the output is in the proper columns, print a "ruler line" of digits as well. (This is simply a debugging aid.) Make sure that you're not using a 19-character column by mistake! For example, entering hello, good-bye should give output something like this:
#
#123456789012345678901234567890123456789012345678901234567890
#               hello
#             good-bye
#Modify the previous program to let the user choose the column width so that entering 30, hello, good-bye (on separate lines) would put the strings at the 30th column. (Hint: see the section in Chapter 2 about controlling variable interpolation.) For extra credit, make the ruler line longer when the selected width is larger.	
##

print "Please enter a list of strings on separate lines. Make sure the first line contains the number of columns you want (say, 20)\n";

#my @lines=<STDIN>;
chomp (my @lines=<STDIN>);

my $col_width = shift @lines;
my $ruler_width = $col_width*3.5/10;
print "Column width is ${col_width}, ruler width is ${ruler_width} (x10) \n";

#This is how I printed the ruler:
#my $ruler="1234567890"x4;
#$ruler.="\n";
#print $ruler;

#And this is how it could be printed in one line
print "1234567890"x${ruler_width},"12345\n";

##I have used a format string trick for printing the array w/o loop
#my $format="%21s"x@lines;
#printf  $format, @lines;

#To print with a loop do:
foreach (@lines) {
  printf "%${col_width}s\n", $_;

  #Note, like in C the following printf format will also work, using the * as indicator to a numerfic format field
  #printf "%*s\n", $width, $_;
}

