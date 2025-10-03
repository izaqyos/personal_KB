#!/usr/bin/perl 
#===============================================================================
#
#         FILE:  format_money_numbers.pl
#
#        USAGE:  ./format_money_numbers.pl  
#
#  DESCRIPTION:  If you have a "money number" that may be large enough to need commas to show its size, you might find it handy to use a subroutine like this one:[*]
#
#      OPTIONS:  ---
# REQUIREMENTS:  ---
#         BUGS:  ---
#        NOTES:  ---
#       AUTHOR:  Yosi Izaq (YI), izaqyos@gmail.com
#      COMPANY:  Cisco systems
#      VERSION:  1.0
#      CREATED:  02/19/09 15:25:48
#     REVISION:  ---
#===============================================================================

use strict;
use warnings;


 sub big_money {
  my $number = sprintf "%.2f", shift @_;
  # Add one comma each time through the do-nothing loop
  1 while $number =~ s/^(-?\d+)(\d\d\d)/$1,$2/;
  # Put the dollar sign in the right place
  $number =~ s/^(-?)/$1\$/;
  $number;
}

print "Money: ", big_money(@ARGV),"\n";
