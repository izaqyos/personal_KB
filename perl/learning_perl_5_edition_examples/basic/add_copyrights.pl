#===============================================================================
#
#         FILE:  add_copyrights.pl
#
#        USAGE:  ./add_copyrights.pl  
#
#  DESCRIPTION:  
#
#      OPTIONS:  ---
# REQUIREMENTS:  ---
#         BUGS:  ---
#        NOTES:  ---
#       AUTHOR:  Yosi Izaq
#      COMPANY:  Cisco systems
#      VERSION:  1.0
#      CREATED:  01/11/09 18:12:53
#     REVISION:  ---
#===============================================================================

use strict;
use warnings;

# [10] Extra credit exercise: write a program to add a copyright line to all of your exercise answers so far, by placing a line like:

 ## Copyright (C) 20XX by Yours Truly


#in the file immediately after the "shebang" line. You should edit the files "in place," keeping a backup. Presume that the program will be invoked with the filenames to edit already on the command line.
# [15] Extra extra credit exercise: modify the previous program so that it doesn't edit the files that already contain the copyright line. (Hint: you might need to know that the name of the file being read by the diamond operator is in $ARGV.)

$^I = ".bac";
my $date = localtime; #Use perl's localtime in scalar context. `date` would also work
my $copyright = "## Copyright (C) $date Yosi Izaq, Cisco Systems";
my $file_to_skip ="";

while (<>)
{
	if (/^#!.*\n${copyright}/) 
	{
		$file_to_skip=$ARGV; # indicate to skip edit of current file if already has copyright
	}

	if (! ($file_to_skip eq $ARGV) ) #only edit files that don't have copyright 
	{
		s/(^#!.*\n)/${&}${copyright}\n/ ;
	}

	print;
}

## Text book solution below (more elegant perhaps)
## Only that my solution only does one pass instead of two and uses substitute instead of append
##
#
#Here's one way to do it:
#
#$^I = ".bak";          # make backups
#while (<>) {
#  if (/^#!/) {         # is it the shebang line?
#    $_ .= "## Copyright (C) 20XX by Yours Truly\n";
#  }
#  print;
#}
#
#
#Invoke this program with the filenames you want to update. For example, if you've been naming your exercises ex01-1, ex01-2, and so on, so that they all begin with ex..., you would use:
#
#./fix_my_copyright ex*
#
#
##
#
#To keep from adding the copyright twice, we have to make two passes over the files. First, we make a "set" with a hash where the keys are the filenames and the values don't matter (although we'll use 1 for convenience):
#
#my %do_these;
#foreach (@ARGV) {
#  $do_these{$_} = 1;
#}
#
#
#Next, we'll examine the files, and remove from our to-do list any file that already contains the copyright. The current filename is in $ARGV, so we can use that as the hash key:
#
#while (<>) {
#  if (/^## Copyright/) {
#    delete $do_these{$ARGV};
#  }
#}
#
#
#Finally, it's the same program as before, once we've reestablished a reduced list of names in @ARGV:
#
#@ARGV = sort keys %do_these;
#$^I = ".bak";          # make backups
#while (<>) {
#  if (/^#!/) {         # is it the shebang line?
#    $_ .= "## Copyright (c) 20XX by Yours Truly\n";
#  }
#  print;
#}
