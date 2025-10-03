#!/usr/bin/perl 
#===============================================================================
#
#         FILE:  list_myRW_files.pl
#
#        USAGE:  ./list_myRW_files.pl  
#
#  DESCRIPTION:  # [10] Make a program that uses stacked file test operators to list all files named on the command line that are owned by you, readable, and writable.
#
#
#      OPTIONS:  ---
# REQUIREMENTS:  ---
#         BUGS:  ---
#        NOTES:  ---
#       AUTHOR:  Yosi Izaq (YI), izaqyos@gmail.com
#      COMPANY:  Cisco systems
#      VERSION:  1.0
#      CREATED:  02/03/09 12:02:01
#     REVISION:  ---
#===============================================================================

use strict;
use warnings;

use 5.010;

print "List of files owned by me and alse readable and writable is: \n"; 
foreach (@ARGV){

print "$_ " if (-r -w -o $_);

}

print "\n";


##Textbook solution
#use 5.010;
#
#say "Looking for my files that are readable and writable";
#
#die "No files specified!\n" unless @ARGV;
#
#foreach my $file ( @ARGV ) {
#    say "$file is readable and writable" if -o -r -w $file;
#	    }
#
#
##		To use stacked file test operators, we need to use Perl 5.10, so we start with the use statement to ensure that we have the right version of Perl. We die if there are no elements in @ARGV, and go through them with foreach otherwise.
##
##		We have to use three file test operators: -o to check whether we own the file, -r to check that it's readable, and -w to check whether it is writable. Stacking them as -o -r -w creates a composite test that only passes if all three of them are true, which is exactly what we want.
##
##		If we wanted to do this with a version before Perl 5.10, it's just a little more code. The says become prints with added newlines, and the stacked file tests become separate tests combined with the && short-circuit operator:
##
##		print "Looking for my files that are readable and writable\n";
##
##		die "No files specified!\n" unless @ARGV;
##
##		foreach my $file ( @ARGV ) {
##		    print "$file is readable and writable\n"
##			        if( -w $file && -r _ && -o _ );
##					    }
