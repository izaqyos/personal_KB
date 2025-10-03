#!/usr/bin/perl 
#===============================================================================
#
#         FILE:  mv.pl
#
#        USAGE:  ./mv.pl  
#
#  DESCRIPTION:     5.  [10] Write a program that works like mv, renaming the first command-line argument to the second command-line argument. (You don't need to handle any of the options of mv or additional arguments.) Remember to allow for the destination to be a directory; if it is, use the same original basename in the new directory.
#
#
#      OPTIONS:  ---
# REQUIREMENTS:  ---
#         BUGS:  ---
#        NOTES:  ---
#       AUTHOR:  Yosi Izaq (YI), izaqyos@gmail.com
#      COMPANY:  Cisco systems
#      VERSION:  1.0
#      CREATED:  02/08/09 17:28:16
#     REVISION:  ---
#===============================================================================

use strict;
use warnings;


use File::Basename;
use File::Spec;

my($source, $dest) = @ARGV;

if (-d $dest) {
  my $basename = basename $source;
  $dest = File::Spec->catfile($dest, $basename);
}

rename $source, $dest
  or die "Can't rename '$source' to '$dest': $!\n";


#The workhorse in this program is the last statement, but the remainder of the program is necessary when we are renaming into a directory. First, after declaring the modules we're using, we name the command-line arguments sensibly. If $dest is a directory, we need to extract the basename from the $source name and append it to the directory ($dest). Finally, once $dest is patched up if needed, the rename does the deed.
