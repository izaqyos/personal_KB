#!/usr/bin/perl 
#===============================================================================
#
#         FILE:  for_when_example.pl
#
#        USAGE:  ./for_when_example.pl  
#
#  DESCRIPTION:  # [15] Using for-when, write a program that goes through a list of files on the command line and reports if each file is readable, writable, or executable. You don't need to use smart matching.
#
#      OPTIONS:  ---
# REQUIREMENTS:  ---
#         BUGS:  ---
#        NOTES:  ---
#       AUTHOR:  Yosi Izaq (YI), izaqyos@gmail.com
#      COMPANY:  Cisco systems
#      VERSION:  1.0
#      CREATED:  05/26/09 17:05:42
#     REVISION:  ---
#===============================================================================

use strict;
use warnings;

use 5.010;

for (@ARGV)
{

my $report = "$_";

when ( -r $_ ) { $report .=' readable'; continue; }
when ( -w $_ ) { $report .=' writable'; continue; }
when ( -x $_ ) { $report .=' executable'; continue; }

say "$report";

}
