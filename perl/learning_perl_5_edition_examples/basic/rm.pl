#!/usr/bin/perl 
#===============================================================================
#
#         FILE:  rm.pl
#
#        USAGE:  ./rm.pl  
#
#  DESCRIPTION:  [6] Write a program that works like rm, deleting any files named on the command line. (You don't need to handle any of the options of rm.)
 
#
#      OPTIONS:  ---
# REQUIREMENTS:  ---
#         BUGS:  ---
#        NOTES:  ---
#       AUTHOR:  Yosi Izaq (YI), izaqyos@gmail.com
#      COMPANY:  Cisco systems
#      VERSION:  1.0
#      CREATED:  02/05/09 11:42:49
#     REVISION:  ---
#===============================================================================

use strict;
use warnings;
use 5.010;

unlink @ARGV;

#Textbook solution
#Here's one way to do it:
#
#unlink @ARGV;
#
#
#¿or, if you want to warn the user of any problems:
#
#foreach (@ARGV) {
#  unlink $_ or warn "Can't unlink '$_': $!, continuing...\n";
#}
#
#
#Here, each item from the command-invocation line is placed individually into $_, which is then used as the argument to unlink. If something goes wrong, the warning gives the clue about why.
