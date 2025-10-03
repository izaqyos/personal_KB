#!/usr/bin/perl 
#===============================================================================
#
#         FILE:  simple_given_when_example.pl
#
#        USAGE:  ./simple_given_when_example.pl  
#
#  DESCRIPTION:  # [15] Write a program using given-when that takes a number as its input, then prints "Fizz" if it is divisible by three, "Bin" if it is divisible by five, and "Sausage" if it is divisible by seven. For a number like 15, it should print "Fizz" and "Bin" since 15 is divisible by both 3 and 5. What's the first number for which your program prints "Fizz Bin Sausage"?
#
#      OPTIONS:  ---
# REQUIREMENTS:  ---
#         BUGS:  ---
#        NOTES:  ---
#       AUTHOR:  Yosi Izaq (YI), izaqyos@gmail.com
#      COMPANY:  Cisco systems
#      VERSION:  1.0
#      CREATED:  05/26/09 16:54:14
#     REVISION:  ---
#===============================================================================

use strict;
use warnings;

use 5.010;

my $num = shift @ARGV;

given ( $num )
{

	when ( ! ($num % 3) ) { say "Fizz"; continue;} 
	when ( ! ($num % 5) ) { say "Bin"; continue;} 
	when ( ! ($num % 7) ) { say "Sausage"; continue;} 
}

##Textbook Solution
#use 5.010;
#
#for (1 .. 105) {
#    my $what = '';
#    given ($_) {
#        when (not $_ % 3) { $what .= ' fizz'; continue }
#        when (not $_ % 5) { $what .= ' buzz'; continue }
#        when (not $_ % 7) { $what .= ' sausage' }
#    }
#    say "$_$what";
#}
