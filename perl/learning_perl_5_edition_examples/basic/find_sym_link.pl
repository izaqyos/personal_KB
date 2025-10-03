#!/usr/bin/perl 
#===============================================================================
#
#         FILE:  find_sym_link.pl
#
#        USAGE:  ./find_sym_link.pl  
#
#  DESCRIPTION:     8.  [7] If your operating system supports it, write a program to find any symbolic links in the current directory and print out their values (like ls -l would: name -> value).
#
#
#      OPTIONS:  ---
# REQUIREMENTS:  ---
#         BUGS:  ---
#        NOTES:  ---
#       AUTHOR:  Yosi Izaq (YI), izaqyos@gmail.com
#      COMPANY:  Cisco systems
#      VERSION:  1.0
#      CREATED:  02/08/09 17:39:55
#     REVISION:  ---
#===============================================================================

use strict;
use warnings;


foreach ( glob ".* *")
{
	my 	$dest = readlink $_ ;
	print "$_ --> $dest \n" if defined $dest;
}
