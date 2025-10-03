#!/usr/bin/perl 
#===============================================================================
#
#         FILE:  parse_date_output.pl
#
#        USAGE:  ./parse_date_output.pl  
#
#  DESCRIPTION:  # [8] Write a program to parse the output of the date command to determine the current day of the week. If the day of the week is a weekday, print get to work, otherwise print go play. The output of the date command begins with Mon on a Monday.[dagger] If you don't have a date command on your non-Unix system, make a fake little program that simply prints a string like date might print. We'll even give you this two-line program if you promise not to ask us how it works:
#
#
#      OPTIONS:  ---
# REQUIREMENTS:  ---
#         BUGS:  ---
#        NOTES:  ---
#       AUTHOR:  Yosi Izaq (YI), izaqyos@gmail.com
#      COMPANY:  Cisco systems
#      VERSION:  1.0
#      CREATED:  06/01/09 14:34:20
#     REVISION:  ---
#===============================================================================

use strict;
use warnings;

use 5.010;

my $date = `date`;

given ($date) {

	when ( $date ~~ /Sat|Sun/) {say "Go play!"; }

	default { say "go to work!";}
}

###Textbook Solution:
## 
#if (`date` =~ /^S/) {
#  print "go play!\n";
#} else {
#  print "get to work!\n";
#}
#
#
##Well, since both Saturday and Sunday start with an S, and the day of the week is the first part of the output of the date command, this is pretty simple. Just check the output of the date command to see if it starts with S. There are many harder ways to do this program, and we've seen most of them in our classes.
##
##If we had to use this in a real-world program, though, we'd probably use the pattern /^(Sat|Sun)/. It's a tiny bit less efficient, but that hardly matters; besides, it's so much easier for the maintenance programmer to understand.
#
